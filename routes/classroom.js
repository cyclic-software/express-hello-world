const express = require('express');
const passport = require('../config/passport-local-strategy');

const Router = new express.Router();
const Controller = require('../controllers/classroom_c');

Router.get('/', Controller.classroom);

module.exports = Router;