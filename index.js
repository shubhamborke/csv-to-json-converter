const express = require("express");
const app = express();
const upload = require("./router/uploadCsv");

app.use("/", upload);

app.listen(3001, () => console.log("listning on 3001"));
