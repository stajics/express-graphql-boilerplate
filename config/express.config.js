const express = require('express');
const path = require('path');
const passport = require('passport');

const routes = require('../server/routes');

const app = express();

app.use(passport.initialize());

app.use('/public', express.static(path.join(__dirname, '/../public')));
app.use('/', routes());

module.exports = app;
