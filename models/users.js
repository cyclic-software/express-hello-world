const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type : String,
        require : true
    },
    userEmail:{
        type: String,
        require : true,
        unique : true
    },
    userPhone: {
        type: Number,
        require: true,
        unique : true
    },
    userPassword: {
        type: String,
        require: true
    },
    terms: {
        type: String,
        require: true
    }
},{
    timestamp: true
})

const users = mongoose.model('users', userSchema);

module.exports = users;