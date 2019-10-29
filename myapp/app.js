var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');


mongoose.connect('mongodb://localhost/nodekb', { useNewUrlParser: true });
let db = mongoose.connection;

//check connection
db.once('open', function () {
    console.log('connected to mongodb')
});

//check for db errors
db.on('error', function (err) {
  console.log(err)
})
// var indexRouter = require('./routes/index');
// // var usersRouter = require('./routes/users');


var app = express();

// parse application/x-www-form-urlencoded
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//let express know it is a static assets fold
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//bring in models
let Article = require('./models/article');

app.post('/articles/edit/:id', function (req, res) {
    let article={};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    let query= {_id:req.params.id}

    Article.update(query, article, function (err) {
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('/');
      }
    })
})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
let users = require('./routes/users');
app.use('/users', users);


app.get('/', function (req, res) {
  Article.find({}, function (err, articles) {
    if(err ){
      console.log(err);
    }else{
      res.render('index', {
        title: 'Articles',
        articles:articles
      });
    }
  });
  // res.render('test');
});

//get single article
//: means its a placeholder, could be anything
app.get('/article/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render('article',{
      article: article
    });
  });
});

//load Edit Form
app.get('/article/edit/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render('edit_article',{
      title:"Edit Article",
      article: article
    });
  });
});

//add Route
app.get('/articles/add', function (req, res) {
  res.render('add_article');

});



//Add Submit
app.post('/articles/add', function (req,res) {
  // console.log('Submitted');
  // return;
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  article.save(function (err) {
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');
    }
  });
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
