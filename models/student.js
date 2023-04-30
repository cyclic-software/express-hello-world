const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const IMG_PATH = path.join('/uploads/images');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    percentage : {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    specialMessage: {
        type: String
    },
    specialMessageColor: {
        type: String
    }

})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '/..' + IMG_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

studentSchema.statics.uploadImage = multer({storage: storage}).single('image');
studentSchema.statics.imagePath = IMG_PATH;

const student = mongoose.model('student', studentSchema);

module.exports = student;