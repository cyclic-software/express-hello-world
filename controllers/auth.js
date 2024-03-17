
require('dotenv').config();

const authenticate = (req, res, next) => {
    const adminPass = process.env.ADMIN; 
    const entered_pass = req.headers['admin_password'];
    console.log(`Password came: ${entered_pass}`)
    if (entered_pass === adminPass) {
      return next();
    } else {
      res.status(401).send(null);
    }
  };


  module.exports=authenticate;
