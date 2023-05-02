const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://katkalesushmit:NYtKNTfGHvFB1Ulw@cluster0.89lyzv0.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind('console','error'));
db.once('open',()=>{
    console.log('Connected to DB');
})

module.exports = db;
