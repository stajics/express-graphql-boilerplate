const express = require('express');
const path = require('path');
const passport = require('passport');

const app = express();

app.use(passport.initialize());

app.use('/public', express.static(path.join(__dirname, '/../public')));

module.exports = app;
