const db = require("../model/db");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectorRouter = express.Router();

//! sign Up new user
connectorRouter.post("/", async (req, res) => {
  try {
    console.log("adding");
    const body = req.body;
    let values = [body.email, body.password];
    const emailCheck = `SELECT * FROM users WHERE email=$1 OR password=$2`;
    const resulte = await db.query(emailCheck, values);
    if (resulte.rows.length > 0)
      return res.status(400).send(`email or password allredy exists`);
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    values = [body.name, body.email, body.password];
    const pushuser = `INSERT INTO users(name,email,password) VALUES ($1,$2,$3)`;
    const resulte3 = await db.query(pushuser, values);
    const token = jwt.sign({ email: req.body.email }, "hakerWillNeverKnow");
    res
      .header("token", token)
      .header("access-control-expose-headers", "token")
      .send(token);
    return token;
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});
//!get user by email
connectorRouter.post("/byEmail", async (req, res) => {
  try {
    const body = req.body;
    const values = [body.email];
    console.log(values);
    const sqlQuery = `SELECT * FROM users WHERE email=$1`;
    const resulte = await db.query(sqlQuery, values);
    res.status(200).send(resulte.rows[0].user_id.toString());
    // console.log(resulte);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//!get user by id
connectorRouter.get("/:id", async (req, res) => {
  try {
    const values = [req.params.id];
    const sqlQuery = `SELECT * FROM users WHERE user_id=$1`;
    const resulte = await db.query(sqlQuery, values);
    res.send(resulte.rows[0].name);
    console.log(resulte.rows.entries());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! get subject info

connectorRouter.get("/", async (req, res) => {
  try {
    //level,rating,subject,subject_pic
    const sqlQuery = `SELECT * FROM subjects ORDER BY subject DESC`;
    const resulte = await db.query(sqlQuery);
    res.send(resulte.rows);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! add cours
connectorRouter.post("/addcourse", async (req, res) => {
  try {
    //! find the subject ID by using name
    const body = req.body;

    const subject_name = [body.subject];
    const sqlQueryFindSbjectName = `SELECT subject_id FROM subjects WHERE subject=$1`;
    const queryFindSubName = await db.query(
      sqlQueryFindSbjectName,
      subject_name
    );
    let subject_i = queryFindSubName.rows[0].subject_id;

    //! check if the user alredy register
    const userID = [body.user_id, subject_i];
    console.log(userID);
    const checkUserId = `SELECT * FROM courses WHERE user_id=$1 AND subject_id=$2`;
    const sqlQueryIfIdsighnd = await db.query(checkUserId, userID);

    if (sqlQueryIfIdsighnd.rows.length > 0)
      return res.status(400).send("you already asiend to this cours");

    //!incret to null ceil
    const value1 = [subject_i];
    const findNullPrimary = `SELECT id FROM courses WHERE user_id IS NULL AND subject_id =$1`;
    const sqlQueryFindPrimary = await db.query(findNullPrimary, value1);
    if (sqlQueryFindPrimary.rows.length !== 0) {
      let primaryOfNull = sqlQueryFindPrimary.rows[0].id;
      const value2 = [body.user_id, primaryOfNull];
      const updateIfCeilIsNull = `UPDATE courses
    SET user_id = COALESCE(user_id, $1)
    WHERE id = $2`;
      const sqlQueryIfNull = await db.query(updateIfCeilIsNull, value2);
      // if (sqlQueryIfNull.rows.length !== 0)
      return res.status(200).send(sqlQueryIfNull);
    }
    //! get the amount of this spesific subject rejusters
    const subID = [subject_i];
    const numOfSub = `SELECT COUNT (*) FROM courses WHERE subject_id=$1`;
    const sqlQuery1 = await db.query(numOfSub, subID);
    let numberOfCoures = sqlQuery1.rows[0].count;
    numberOfCoures = Math.floor(numberOfCoures / 22) + 1;

    //! gets the subject by subject id
    const subjectName = `SELECT subject FROM subjects WHERE subject_id=$1`;
    const sqlQuery3 = await db.query(subjectName, subID);

    const className = sqlQuery3.rows[0].subject;
    let classNamePluseNumber = className + ` ` + `${numberOfCoures}`;
    const values = [body.user_id, subject_i, classNamePluseNumber];
    const request = `INSERT INTO courses(user_id,subject_id,course_name) VALUES ($1,$2,$3)`;
    const sqlQuery2 = await db.query(request, values);
    res.send(sqlQuery2.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! delete user_id from a spesific ceil
connectorRouter.post("/deleteUserCourse", async (req, res) => {
  try {
    const body = req.body;
    //! get the subject id
    const value1 = [body.course_name];
    const sqlQuery1 = `SELECT subject_id FROM subjects WHERE subject=$1`;
    const resulte1 = await db.query(sqlQuery1, value1);
    let subject_id = resulte1.rows[0].subject_id;

    //! get the user id of the last user ini cours
    const value = [subject_id, body.user_id];
    console.log(value);
    const sqlQuery = `UPDATE courses SET user_id = null WHERE subject_id=$1 and user_id = $2`;
    const resulte = await db.query(sqlQuery, value);
    res.status(200).send(resulte.rows);

    // console.log(resulte.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//! change password
connectorRouter.put("/changePassword", async (req, res) => {
  try {
    const body = req.body;
    const salt = await bcrypt.genSalt(10);
    body.new_password = await bcrypt.hash(body.new_password, salt);
    const value = [body.email, body.new_password];
    const sqlQuery = `UPDATE users SET password = $2 WHERE email=$1`;
    const resulte = await db.query(sqlQuery, value);

    res.status(200).send(resulte.rows);
    console.log("password changed");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! get users courses
connectorRouter.post("/getusercourses", async (req, res) => {
  try {
    const body = req.body;
    const value = [body.id];
    console.log(value);
    const sqlQuery = `SELECT course_name  FROM courses WHERE user_id=$1`;
    const resulte = await db.query(sqlQuery, value);
    console.log(resulte.rows);
    res.status(200).send(resulte.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = connectorRouter;
