const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require('i18n-2');
const vhost = require('vhost');

const news = require('./news');
const noticias = require('./noticias');

var app = express();

// i18n setup
i18n.expressBind(app, {
  locales: {
    'en': require('../locales/en')(app.get('env')),
    'es': require('../locales/es')(app.get('env'))
  }
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (app.get('env') === 'development') {
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(vhost('news.r1b.local', news));
  app.use(vhost('noticias.r1b.local', noticias));
}
else {
  app.use(logger('prod'));
  app.use(vhost('news.r1b.solutions', news));
  app.use(vhost('noticias.r1b.solutions', noticias));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(req.i18n.__('Not Found'));
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.title = req.i18n.__('Error');
  res.locals.locales = req.i18n.locales;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
