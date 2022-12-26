require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const fileUpload = require("./function/fileUpload");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
// app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 100000000,
  })
);
// const upload = multer({ dest: "/tmp/", limits: "250mb" });

app.use(
  "/file-upload",
  fileUpload.single("file"),
  require("./function/sendToMega")
);

app.use(express.static(path.join(__dirname, "/public")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
