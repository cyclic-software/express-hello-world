const User = require('../models/users');

module.exports.slash = (req,res) => {
    return res.end('users');
}

module.exports.signIn = (req,res) => {
    return res.render('sign_in');
}

module.exports.signUp = (req,res) => {
    return res.render('sign_up');
}

module.exports.postSignUp = async (req,res) => {
    if(req.body.userPhone.length != 10){
        req.flash('error','Invalid Phone Number');
        return res.redirect('back');
    }
    if(req.body.userPassword.length < 8){
        req.flash('error','length of password must be greater than 8');
        return res.redirect('back');
    }
    User.create(req.body).then(()=>{
        req.flash('success','Account created succesfully');
        return res.redirect('/users/sign-in');
    }).catch((err) => {
        req.flash('error','Email or phone already exists!');
        return res.redirect('back');
    })

}


module.exports.postSignIn = (req,res) =>{
    return res.redirect('/adminDashboard');
}

module.exports.signOut = (req,res) => {
    req.logout(err=>{
        if(err){
            req.flash('error','Error connecting to server');
            return res.redirect('back');
        }else{
            return res.redirect('/')
        }
    });
}