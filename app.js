require('dotenv').config();
const express = require('express')
const path = require("path");
const app = express()

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))


const morgan = require('morgan');

// const fs = require('fs');

const sendPrompt = require('./controllers/sendPrompt');
const getChatBison=require('./controllers/getChatBison');
const authenticate = require('./controllers/auth');
const getAdminLogin = require('./controllers/getAdminLogin');
const getAdminDash = require('./controllers/getAdminDash');

// const logStream = fs.createWriteStream(path.join(__dirname, 'console.log'), { flags: 'a' });

// console.log = function (message) {
//   process.stdout.write(`${message}\n`);
//   logStream.write(`${new Date().toISOString()} - ${message}\n`);
// };

app.use(morgan('combined'));
app.use(express.json());
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', getChatBison);
app.post('/send_prompt', sendPrompt);
app.get('/admin', getAdminLogin);
app.get('/getAdmin', authenticate, getAdminDash);



// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
    .end()
})

module.exports = app
