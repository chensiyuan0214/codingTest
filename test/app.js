var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var router = express.Router();
//Import the mongoose module
// var mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1/test",{ useNewUrlParser: true } );
// mongoose.connection.once("open",function () {
//   console.log("数据库连接成功~~~");
// });
// Get the default connection
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Home page route.

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/*
we create the app object using our imported express module,
and then use it to set up the view (template) engine. There
are two parts to setting up the engine. First, we set the 'views'
value to specify the folder where the templates will be stored
(in this case the subfolder /views). Then we set the 'view engine'
value to specify the template library (in this case "pug").
 */
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/', function(req, res){
  res.sendFile('index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
