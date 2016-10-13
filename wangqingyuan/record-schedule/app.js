var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var log = require("log4js").getLogger("app")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));




app.use(logger('dev'));
var sessioncfg = {
  resave: false,
  saveUninitialized: false,
  name: "recordschedule.sid",
  secret: 'iamluodong@126.com'
}
app.use('/api', require("./routes/api"));
app.use('/', session(sessioncfg));
app.all('/admin/', function (req, res, next) {
  if (req.session.auth != "ok") {
    res.redirect('/admin/login.html');
    return;
  }
  next();
})
app.all('/admin/*.html', function (req, res, next) {
  log.info(req.session.auth)
  if (req.session.auth != "ok" && req.path.indexOf("login.html") < 0) {
    log.info("ggggggggggggggggggg")
    res.redirect('/admin/login.html');
    return;
  }
    log.info("rrrrrrrrrrrrrrrrrrrr")
  //管理类接口不缓存
  res.header('Cache-Control', 'no-cache, private');
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  next();

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/admin", express.static(path.join(__dirname, 'public')));

//跨域支持
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'origin, content-type');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use('/', routes);
app.use('/admin', require("./routes/admin"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use(function (err, req, res, next) {
    log.error(err.stack)
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
