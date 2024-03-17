const path = require('path');

function getAdminLogin(req,res){
    res.sendFile(path.join(__dirname,'..','public','admin','admin-login.html'))
}

module.exports=getAdminLogin;