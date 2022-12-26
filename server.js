require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// const upload = require("./function/fileUpload");

const app = express();
app.use(express.json({ limit: "250mb" }));
app.use(express.bodyParser({ limit: "250mb" }));

app.use(cors());

const port = process.env.PORT || 5000;

const upload = multer({ dest: "/tmp/" });

app.use(
  "/file-upload",
  upload.single("file"),
  // express.json({ limit: "10MB" }),
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
