require('dotenv').config();
const app = require('./app')
const mongoose=require('mongoose')
const port = process.env.PORT || 3000;
const MONGODB_URI=process.env.MONGODB_URI || '';
console.log("Connecting to the database...");
async function golive()
{
  try{
    const database = await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB: ",database.connection.host)
  }catch(e){
    console.error('🔴 ',e);
  }

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
}
golive();

