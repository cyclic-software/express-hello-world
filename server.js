require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ extended: false, limit: "250mb" }));

const port = process.env.PORT || 5000;

app.use("/get-file", require("./function/sendToMega"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // require("./function/sendToMega")();
});
