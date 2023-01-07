const mongoose = require("mongoose");

const connectToDataBase = async (req,res)=>{
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to mongodb at ${connected.connection.host}`);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports = connectToDataBase