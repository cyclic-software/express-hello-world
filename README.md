# Express Hello World

Implements the Expressjs Hello World example to provide a faster start deploying onto the Cyclic platform

## Installation

- Fork this repo
- Clone to your local
- `npm install`

## Running

- `npm start`
- Browser: `http://localhost:3443/some/path?q=query+one&q=second+query&single=value`
- Commandline: `curl -i -XGET "http://localhost:3443/cmd/line-curl"`

## Cyclic Runtime

- The Cyclic runtime expects a file in the root of your project named `app.js`
- The runtime will `const app = require('./app')`
- The runtime expects the express app to be exported as: `module.exports = app`
