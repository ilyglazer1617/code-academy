const db = require("./db");

const UserTable = async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) CHECK (email ~* '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$') NOT NULL,
        password varchar(255) NOT NULL 
    )`);
    console.log("user table created");
  } catch (error) {
    console.log(error);
  }
};
module.exports = UserTable;
