var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const i18n = require('i18n-2');

var index = require('./routes/index');

var app = express();

// i18n setup
i18n.expressBind(app, {
  locales: {
    'en': {
      // XXX this is a terrible hack sorry god
      '$HREF': 'https://news.r1b.solutions',

      'news': 'news',
      'More': 'More',
      'Error': 'Error',
      'Invalid page': 'Invalid page',
      'Wire services for everyone': 'Wire services for everyone'
    },
    'es': {
      '$HREF': 'https://noticias.r1b.solutions',

      'news': 'noticias',
      'More': 'Más',
      'Error': 'Error',
      'Invalid page': 'Página no válida',
      'Wire services for everyone': 'Servicios de cable para todos'
    }
  }
});
app.use(function(req, res, next) {
  // FIXME : This is gonna get reaaaal brittle reaaaal fast
  if (req.hostname.startsWith('noticias')) {
    req.i18n.setLocale('es');
  }
  else {
    req.i18n.setLocale('en');
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
