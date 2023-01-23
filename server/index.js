const express = require("express");
const cors = require("cors");
const app = express();

const userTable = require("./model/userTable");
const subjecTable = require("./model/subjects");
const coursesTable = require("./model/courses");
const connected = require("./roustes/db_connector");
const authRouter = require("./roustes/auth");
app.use(cors());
app.use(express.json());
userTable();
subjecTable();
coursesTable();

app.use("/api/connected", connected);
app.use("/api/logIn", authRouter);

const port = process.env.PORT || 2030;
app.listen(port, () => console.log(`activ on port ${port}`));
