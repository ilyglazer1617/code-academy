const { Client } = require("pg");
const client = new Client({
  user: "postgres", //! what admin am i using ? postgres
  host: "localhost", //!HOS
  database: "course", //!name oF DB
  password: "ilySQLglazer", //!pg admin password
  port: 5432, //!defulte port of pg admin
});
client.connect(); //!TELL TO connect to DATA BASE ( PG ADMIN )

module.exports = client;
