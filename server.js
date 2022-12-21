require("dotenv").config();

const app = require("express")();
const port = process.env.PORT || 4000;

app.use("/get-file", require("./function/sendToMega"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // require("./function/sendToMega")();
});
