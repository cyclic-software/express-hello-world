require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// const upload = require("./function/fileUpload");

const app = express();
app.use(cors());
app.use(express.json({ extended: false, limit: "250mb" }));

const port = process.env.PORT || 5000;

const upload = multer({ dest: __dirname + "/uploads/" });

app.post(
  "/file-upload",
  upload.single("file"),
  require("./function/sendToMega")
);

app.use(express.static(path.join(__dirname, "/public")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // require("./function/sendToMega")();
  console.log("checking");
});
