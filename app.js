const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const session = require("express-session");
dotenv.config({path:"./configFolder/config.env"});
const  exphbs =  require('express-handlebars');
const port = process.env.PORT || 3000;
//passport
const passport = require("passport");
require("./configFolder/passport")(passport);
//passport


//database
const connected = require("./configFolder/database");
const connectToDataBase = require("./configFolder/database");
//database


const app = express();


//dotenv
connectToDataBase();
//dotenv


app.use(express.urlencoded({extended:false}));
app.use(express.static("./public"));


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


app.use(session({secret:"cats",
resave:false,
saveUninitialized:false,
store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
})
}));


app.use(passport.initialize());
app.use(passport.session())


app.get("/auth/google",(req,res,next)=>{
    if(req.isAuthenticated())
    {
        res.redirect("/on_signin_pages/storiesPage/user_typed_data");
    }
    else
    {
        next();
    }
},passport.authenticate('google',{scope:["profile"]}))
app.engine(".hbs",exphbs.engine({defaultLayout:"main",extname:".hbs"}));
app.set("view engine",".hbs");
app.get("/google/callback",passport.authenticate("google",{failureRedirect:"/components/signin"}),(req,res)=>{
   res.redirect("/on_signin_pages/storiesPage/user_typed_data");
})


app.get("/components/sigin",(req,res)=>{
    res.sendFile("/public/components/signin.html",{root:path.join(__dirname)})
})
app.use("/on_signin_pages/storiesPage/user_typed_data",require("./folder_for_dashboard/routerforuserdata"));


app.get("/logout",(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err);}
            res.redirect("/components/sigin");
        })
    })

    
app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})