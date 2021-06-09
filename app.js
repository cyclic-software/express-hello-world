const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res
    .set('x-powered-by', 'cyclic-express')
    .send('Hello World!')
})

app.use('*', (req,res) => {
  res
    .set('x-powered-by', 'cyclic-express')
    .json({
      msg: "Not strickly part of the hello world but you get the picture.",
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      path: req.params[0],
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
    })
})

module.exports.app = app
