var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var helmet       = require('helmet');
var requireDir   = require('require-dir');
var subdomain    = require('express-subdomain');

var app = express();

// mount all routes http://stackoverflow.com/a/25446206
var stressRouter = require('./routes/stress/stressRouter');
//var subdomainOpts = { base : 'localhost', removeWWW : true };
app.use(subdomain('stress', stressRouter)); //(subdomainOpts));
//app.use(require('subdomain')('stress', stressRouter)); //(subdomainOpts));

var routes = requireDir('./routes', {recurse: false}); // https://www.npmjs.org/package/require-dir
for (var i in routes) app.use('/', routes[i]);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // short
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist')));

//var subdomainOpts = { base : 'localhost', removeWWW : true };

//app.use(subdomain('stress', stressRouter));

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
