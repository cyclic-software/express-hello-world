const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    console.log("called");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "myfile.js");
  },
});

module.exports = upload = multer({ storage: storage });
