'use strict';

const express = require('express'),
      path = require('path'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      compression = require('compression'),
      secure = require('express-force-https');


// Hook for database connection
require('./api/api.config');

// Route setup for api and back end
const routesApi = require('./api/api.routes'),
      routesAdmin = require('./admin.routes');

let app = express();

app.listen(process.env.PORT || 3000, function() {
  console.log('Express has started on port 3000');
});

// Force https
app.use(secure);

// compress all responses
app.use(compression());

// view directory setup
app.set('views', [`${__dirname}/views`]);
app.set('view engine', 'pug');

// logging middleware
app.use(logger('dev'));

// parsing middleware for json and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

// middleware allows for put and delete requests on forms
app.use(methodOverride('_method'));

// route setup
app.use('/api', routesApi);
app.use('/', routesAdmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// finally we export the app module
module.exports = app;