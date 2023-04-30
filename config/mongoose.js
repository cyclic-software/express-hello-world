const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/new_DB');

const db = mongoose.connection;

db.on('error',console.error.bind('console','error'));
db.once('open',()=>{
    console.log('Connected to DB');
})

module.exports = db;