require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fs = require("fs");

const { Storage } = require("megajs");

const app = express();

// Set up Multer to handle file uploads
const upload = multer({ dest: "/tmp" });

// Set up route to handle file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Get the uploaded file from the request
    const file = req.file;
    console.log(file);
    // Set up MEGA.io client
    const storage = await new Storage({
      email: process.env.MEGA_EMAIL,
      password: process.env.MEGA_PASSWORD,
    }).ready;
    console.log("logged in");
    const data = fs.readFileSync(`uploads/${file.filename}`);

    const upFile = await storage.upload("test.js", data).complete;
    console.log("success");
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
