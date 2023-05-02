const results = require('../models/results');
const student = require('../models/student');


module.exports.dashBoard = (req,res) => {
    results.find({})
    .populate({
        path: 'students'
    })
    .then(val => {
        return res.render('admin',{
            results: val
        });
    }).catch((err) => {
        console.log("Error",err);
    })
    
}

module.exports.addResult = (req,res) => {
    // console.log(req.body);
    results.create(req.body).then(val => {
        return res.redirect('back');
    }).catch(err => {
        console.log("Error",err);
    })
    
}

module.exports.removeResult = async(req,res) => {
    try{
        let result = await results.findById(req.query.rid);
        
        for (let i = 0; i < result.students.length; i++) {
            // console.log(result.students[i]);
            await student.findByIdAndDelete(result.students[i]);
        }

        await results.findByIdAndDelete(req.query.rid);

        return res.redirect('back');
    }catch(err){
        console.log("Error",err);
    }
}


module.exports.addStudent = (req,res) => {
    student.uploadImage(req,res,function(err){
            if(err){
                console.log("--------------------"+err);
            }
            // console.log("IN",req.file);
            if(req.file){
                student.create({
                    name: req.body.name,
                    image : student.imagePath + '/' + req.file.filename,
                    percentage: req.body.percentage+"%",
                    order: req.body.order,
                    specialMessage: req.body.specialMessage
                }).then(s => {
                    // console.log("sn",req.query);
                    results.findOneAndUpdate({_id: req.body.rid},{
                        $addToSet:{
                            students: s
                        }
                    }).then(val => {
                        // console.log("S" + val);
                    }).catch(err=>{
                        console.log("Error results",err);
                    })
                }).catch(err => {
                    console.log("Error",err);
                })
            }
        })

        return res.redirect('back');

}

module.exports.removeStudent = async(req,res) => {
    try{
        let s = await student.findOneAndUpdate(req.query.sid);
        // console.log(s);
        await results.findOneAndUpdate({_id: req.query.rid},{
            $pull: {
                students : s._id
            }
        })
        await student.findOneAndDelete({_id: req.query.sid});

        return res.redirect('back');

    }catch(err){
        console.log("Error",err);
    }
}