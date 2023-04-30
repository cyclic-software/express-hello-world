const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    }]
})

const result = mongoose.model('result', resultSchema);

module.exports = result;