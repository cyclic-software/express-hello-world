const mongoose = require("mongoose");
const userData = new mongoose.Schema({
    googleid:{
        type: String,
        required:true
    },
    displayname:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    userimage:{
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User",userData)