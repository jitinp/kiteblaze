var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js');

// Configuration DB --------------------------
mongoose.connect(configDB.url);

// Configure Passport ------------------------
require("./config/passport")(passport);

// Add Routes to variabls --------------------
var index = require('./routes/index');
var about = require('./routes/about');

// // Pass Passport to User Routers to authenticate
var signup = require('./routes/signup')(passport);

var contact = require('./routes/contact');
var deploy = require('./routes/deploy');
var folder = require('./routes/folder');

var app = express();

// view engine setup --------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure session for Passport
app.use(session({
    secret: 'kiteblazetest', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Link Routes ---------------------------------
app.use('/', index);
app.use('/about', about);
app.use('/signup', signup);
app.use('/contact', contact);
app.use('/deploy', deploy);
app.use('/folder', folder);

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
