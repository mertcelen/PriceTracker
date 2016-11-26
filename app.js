var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'WmQqZw@ew78uNH-_JMbFUTC<<X,tLh3)',
    resave: true,
    saveUninitialized: true
}));

//Webpages Begin

var index = require('./routes/index');
var database = require('./models/database');
var admin = require('./routes/admin');
var get = require('./routes/api/get');
var add = require('./routes/api/add');
var update = require('./routes/api/update');

app.use('/', index);
app.use('/admin', admin);
app.use('/api/add/source', add.source);
app.use('/api/add/game', add.game);
app.use('/api/get/sources', get.sources);
app.use('/api/get/platform/:name', get.platform);
app.get('/api/get/all', get.all);
app.use('/api/get/game/:name', get.game);
app.use('/api/update/one/:name', update.one);
// app.use('/api/update/all', update.all);

//Webpages End

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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
