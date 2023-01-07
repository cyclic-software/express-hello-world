const mongoose = require("mongoose");
const taskschema = mongoose.Schema({
    firstname:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("Task",taskschema)