const mongoose= require("mongoose");
const {Schema} = mongoose;
const user_typed_data = new mongoose.Schema({
    googleid2:{type:String},
    title:{type:String,required:true},
    message:{type:String,required:true},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    createdTime:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Usertypeddata",user_typed_data)