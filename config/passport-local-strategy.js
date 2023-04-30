const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

//-----------------------------------------------------------Local
passport.use(new LocalStrategy({
        usernameField : 'userEmail',
        passwordField: 'userPassword',
        passReqToCallback : true
    },
    (req,userEmail,password,done) => {
        User.findOne({userEmail : userEmail}).then((user) => {
            if(!user || user.userPassword != password){
                req.flash('error','Invalid email or password');
                return done(null,false);
            }else{
                console.log('Done');
                done(null,user);
            }
        }).catch(err => {
            req.flash('error','Error connecting to server');
            return done(err);
        })
    }
));

passport.serializeUser((user,done) => {
    done(null, user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        return done(null , user);
    }).catch(()=>{
        console.log("Error connecting to server");
    })
})

passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticateUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

passport.checkAuthentication2 = (req,res,next) => {
    if(!req.isAuthenticated()){
        return next();  
    }
    return res.redirect('/users');
}

module.exports = passport;

//--------------------------------------------------------------Local