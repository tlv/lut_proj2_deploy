var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var params = require('express-params');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/fritter');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/home');
var logout = require('./routes/logout');
var edit = require('./routes/edit');
var del = require('./routes/del');

var app = express();

params.extend(app);

app.param('id', /[0-9|a-f]+$/);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: '1234567890', 
    resave: true, 
    saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/login', login);
app.use('/auth', login);
app.use('/register', register);
app.use('/adduser', register);
app.use('/logout', logout);
app.use('/edit/', edit);
app.use('/editpost', edit);
app.use('/del/', del);
app.use('/deletepost', del);
app.use('/home', home);
app.use('/writepost', home);
app.use('/', home);

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


module.exports = app;