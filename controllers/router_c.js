const results = require('../models/results');
const student = require('../models/student');

module.exports.home = (req,res) => {
    return res.render('home')
}

module.exports.prevResult = (req,res) => {
    results.find({})
    .populate({
        path: 'students'
    })
    .then(val => {
        return res.render('prevResult',{
            results: val
        });
    }).catch((err) => {
        console.log("Error",err);
    })
}

module.exports.courses = (req,res) => {
    return res.render('courses');
}