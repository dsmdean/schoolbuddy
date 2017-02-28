var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./server/authenticate');
var config = require('./server/config');

// Connection URL
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected correctly to server");
});

var index = require('./server/routes/index');
var users = require('./server/routes/users');
var schools = require('./server/routes/schools');
var teachers = require('./server/routes/teachers');
var students = require('./server/routes/students');
var classrooms = require('./server/routes/classrooms');
var schoolYear = require('./server/routes/schoolYear');
var activities = require('./server/routes/activities');
var subjects = require('./server/routes/subjects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport config
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);
app.use('/api/schools', schools);
app.use('/api/teachers', teachers);
app.use('/api/students', students);
app.use('/api/classrooms', classrooms);
app.use('/api/schoolyear', schoolYear);
app.use('/api/activities', activities);
app.use('/api/subjects', subjects);

// app.get('/*', function(req, res) {
//     res.sendFile(__dirname + '/public/src/index.html')
// });

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