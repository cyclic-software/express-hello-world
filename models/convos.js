const mongoose = require('mongoose');

const convoSchema = mongoose.Schema({
    prompt:{
        type:String
    },
    resp:{
        type:String
    },
    userInfo:{
        type:Object
    }
},{
    timestamps:true
})

const convoModel = mongoose.model("convo",convoSchema);

module.exports=convoModel;