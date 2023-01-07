const express = require("express");
const router = express.Router();
const Task = require("./taskschema");
const passport = require("passport");
require("../configFolder/passport")(passport);
const isloggedin = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        next();
    }
    else
    {
        res.sendStatus(401);
    }
    }

router.get("/on_signin_pages/storiesPage",isloggedin,async (req,res)=>{
    try {
        //console.log(req.user)
        res.render('storiesPage',{name:req.user.displayname,photo:req.user.userimage,requesturl:req.url,firstname:req.user.firstname,googleid2:req.user.googleid,inputdata:req.task});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router