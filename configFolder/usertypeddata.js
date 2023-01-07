
const { json } = require("body-parser");
const Usertypeddata = require("../database_data/User_data");
const getalltask =async (req,res)=>{
    try{
    //const task = await Usertypeddata.find({});
  //  const sendid = req.body.googleid;
    const task = await Usertypeddata.find({}).populate("user").sort({createdtime:"desc"}).lean();
   //console.log(req.user.firstname);
        const reqname = req.user.firstname;
        const reqimage = req.user.userimage;
        const reqid = req.user.googleid;
      res.render("storiesPage",{datavalue:task,reqname,reqimage,reqid});
   // res.status(200).json({task});
    //res.redirect("/on_signin_pages/storiesPage/");
    }
    catch(err){
        res.redirect("/components/signin.html")
    }
}
const gettask =async (req,res)=>{
    try{
        //console.log(req.params.id)
        let par = req.params.id
        //let usergoogleid = user.googleid;
       // const requser = req.user.googleid
        //console.log(typeof(par))
        const task = await Usertypeddata.find({googleid2:par}).populate("user").sort({createdtime:"desc"}).lean();
   // console.log(task.user.googleid);
     // res.render("storiesPage",{datavalue:task});
     const reqname = req.user.firstname;
     const reqimage = req.user.userimage;
     const reqid = req.user.googleid;
   res.render("storiesPage",{datavalue:task,reqname,reqimage,reqid});
    //res.redirect("/on_signin_pages/storiesPage/");
    }
    catch(err){
      res.redirect("/components/signin.html")
    }
}

const posttask =async (req,res)=>{
    const newdata = {
        googleid2:req.user.googleid,
        title:req.body.title,
        message:req.body.message,
        user:req.user._id
    }
   // console.log(req.user);
    try{
         await Usertypeddata.create(newdata);
         
         //await Usertypeddata.create(req.body);
       //  const sendid = req.body.googleid;
   // const task = await Usertypeddata.find({googleid2:sendid});
     res.redirect("/on_signin_pages/storiesPage/user_typed_data")
       // res.status(201);
    }
    catch(err){
      res.redirect("/components/signin.html")
    }
}

module.exports = {getalltask,posttask,gettask}