const express = require('express');
const passport = require('../config/passport-local-strategy');

const Router = new express.Router();
const Controller = require('../controllers/admin_c');

Router.get('/', Controller.dashBoard);

Router.post('/addResult', Controller.addResult);

Router.get('/removeResult', Controller.removeResult);

Router.post('/addStudent', Controller.addStudent);

Router.get('/removeStudent', Controller.removeStudent);

Router.use('/classroom', require('./classroom'));

module.exports = Router;