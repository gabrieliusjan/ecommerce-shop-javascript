var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql = require('mysql');
var lessMiddleware = require('less-middleware');
var bodyParser = require('body-parser');

// db connection
var config = require('./config')
var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port, 
    database: config.database.db
}

var postRouter = require('./routes/post');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

var myConnection  = require('express-myconnection')

app.use(myConnection(mysql, dbOptions, 'pool'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session login
app.use(session({secret:'secret-code',resave:false,saveUninitialized:true,cookie:{maxAge:6000}}));
var checkUser=function(req,res,next){
  if(req.session.loggedIn){
    next();
  }else{
    if(req.body.username==="admin" && req.body.password==="admin"){
      req.session.loggedIn=true;
      res.redirect('/orders');
    }else if(req.body.username==="customer" && req.body.password==="customer"){
      req.session.loggedIn=true;
      res.redirect('/shop');
    }else{
      res.render('errorlogin',{title:"Login Again"});
    }
  }
};

// session logout
var logout = function(req,res,next){
  req.session.loggedIn=false;
  res.redirect('/');
};

app.use('/post', checkUser, postRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
