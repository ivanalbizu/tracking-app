const express = require('express');
const app = express();

const track = require('./track');
app.use('/track', track);

const stats = require('./stats');
app.use('/stats', stats);

const config = require('./config');
app.use('/config', config);

const login = require('./auth');
app.use('/auth', login);

module.exports = app;