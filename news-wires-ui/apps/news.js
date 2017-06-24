const path = require('path');
const express = require('express');
const app = express();

const index = require('../routes/en');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(function (req, res, next) {
  req.i18n.setLocale('en');
  next();
});

app.use('/', index);

module.exports = app;
