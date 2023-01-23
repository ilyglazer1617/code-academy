const express = require("express");
const db = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
  try {
    //!check email
    const body = req.body;
    const values = [body.email];
    const usernameCheck = `SELECT email FROM users WHERE email = $1`;
    const resulte = await db.query(usernameCheck, values);
    if (resulte.rows.length == 0)
      return res.status(400).send("email or password taken");
    //! check password
    const value2 = [body.email];
    const passwordCheck = `SELECT password FROM users WHERE email = $1`;
    const resulte2 = await db.query(passwordCheck, value2);
    const password = resulte2.rows[0].password;
    let compering = await bcrypt.compare(body.password, password);
    if (!compering)
      return res.status(400).send(compering + "email or password are wrong");
    let token = jwt.sign({ email: body.email }, "hakerWillNeverKnow");
    res
      .header("token", token)
      .header("access-control-expose-headers", "token")
      .send(token);
  } catch (error) {
    res.status(400).send(error.message + "hi");
  }
});

module.exports = authRouter;
