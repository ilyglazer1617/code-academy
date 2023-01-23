const db = require("./db");

const coursesTable = async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS courses(
        id SERIAL PRIMARY KEY,
        course_name varchar(255),
        user_id int,
        subject_id int,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (subject_id) REFERENCES subjects(subject_id))`);
    console.log("subject created");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = coursesTable;
