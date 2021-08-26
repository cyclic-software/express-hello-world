# Cyclic Hello World

This is a basic Expressjs app with static file hosting and 

## Installation

- Fork this repo (https://github.com/cyclic-software/express-hello-world)
- Clone to your local
- `npm install`

## Local

- `npm run serve`
- Browser: `http://localhost:3000/some/path?q=query+one&q=second+query&single=value`
- Commandline: `curl -i -XGET "http://localhost:3000/cmd/line-curl"`

## Cyclic Runtime

- The Cyclic runtime expects a file in the root of your project named `server.js`
- The runtime will `node .` which runs your `server.js` by default.
