const path = require('path');
const express = require('express');
const app = express();

const index = require('../routes/es');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(function (req, res, next) {
  req.i18n.setLocale('es');
  next();
});

app.use('/', index);

module.exports = app;
