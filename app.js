const express = require('express')
const path = require("path");
const app = express()

// /////////////////////////////////////////////////////////////////////////////
// Logs all requests path and method
app.use(function (req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// /////////////////////////////////////////////////////////////////////////////
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static('public', options))


// /////////////////////////////////////////////////////////////////////////////
// This handles GET requests to the root route '/'
app.get('/', (req, res) => {
  console.log('[express-hello-world] root handler called')
  res
    .set('x-powered-by', 'cyclic.sh')
    .send('<h1>Hello World!</h1>')
    .end()
})

app.use('*', (req,res) => {
  // console.log(`[express-hello-world] * handler ${req.method}:${req.path}`)
  res
    .set('x-powered-by', 'cyclic.sh')
    .json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params,
      env: process.env
    })
    .end()
})

module.exports = app
