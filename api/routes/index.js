const express = require('express');
const app = express();

const user = require('./user');
app.use('/user', user);

const stats = require('./stats');
app.use('/stats', stats);

const config = require('./config');
app.use('/config', config);

const login = require('./auth');
app.use('/auth', login);

module.exports = app;