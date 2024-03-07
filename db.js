require("dotenv").config();
const { Client } = require("pg");
const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASS,
});

client
  .connect()
  ?.then((res) => {
    console.log("connection established");
  })
  .catch((err) => console.log(err));

module.exports = { client };
