const express = require("express");
const router = express.Router();
const { client } = require("../db");
const multer = require("multer");
const upload = multer({ dest: "../files" });
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../readme.md"));
});

router.post("/upload", upload.single("csv"), (req, res) => {
  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      // if wrong formated csv file inserted
      console.log(err);
      res?.status(400).send("Please send valid csv file");
    } else {
      client.query("BEGIN");

      // convert csv frames into comma seperated format
      const result = data.toString().split("\n");
      const columns = result[0].split(",");
      // loop through each row of csv excluding heads
      result.slice(1).forEach((col) => {
        const filteredCol = col?.split(",");
        let temp = {
          name: "",
          age: 0,
          additional_info: {},
        };
        // dynamic order of columns in csv will be converted in codered format
        for (const head in columns) {
          if (columns[head].includes("firstName")) {
            temp.name = filteredCol[head] + " " + temp.name;
          } else if (columns[head].includes("lastName")) {
            temp.name += filteredCol[head];
          } else if (columns[head].includes("gender")) {
            temp.additional_info = {
              ...temp.additional_info,
              [columns[head]]: filteredCol[head],
            };
          } else if (
            ["line1", "line2", "city", "state"]?.includes(
              columns[head]?.split(".")[1]
            )
          ) {
            temp.additional_info = {
              ...temp.additional_info,
              [columns[head]?.split(".")[1]]: filteredCol[head],
            };
          } else {
            temp[columns[head]] = filteredCol[head];
          }
        }
        // inserting each row as per explained in assignment
        client
          .query(
            `INSERT INTO users (name, age, additional_info) VALUES ($1, $2, $3)`,
            Object?.values(temp)
          )
          .catch((err) => {
            // rollback transition if any of row is not able to inset in table
            console.log(err);
            client.query("ROLLBACK");
            res.status(500).send("something went wrong");
          });
          
        client.query("COMMIT");
      });
      // send status ok response
      res?.status(200).send("Data insered");
    }
  });
});

router.get("/all_data", (req, res) => {
  client
    .query("SELECT * FROM users")
    ?.then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("something went wrong");
    });
});

module.exports = router;
