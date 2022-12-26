const multer = require("multer");
const { Storage } = require("megajs");

const storage = multer.diskStorage({
  destination: "/tmp/",
  filename: function (req, file, cb) {
    console.log("called");
    cb(null, file.originalname);
  },
});

module.exports = upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 10 MB
  },
});
