const express = require('express');
const passport = require('../config/passport-local-strategy')

const Router = new express.Router();
const Controller = require('../controllers/router_c');

Router.get('/', Controller.home);

Router.get('/courses',Controller.courses);

Router.get('/previous-result', Controller.prevResult);

Router.use('/admin', require('./admin'));

module.exports = Router;
