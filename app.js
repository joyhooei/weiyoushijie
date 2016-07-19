'use strict';

var domain = require('domain');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var flash = require('express-flash');

var home = require('./routes/index');
var admin = require('./routes/admin');
var api = require('./routes/api');
var accounts = require('./routes/accounts');
var customers = require('./routes/customers');
var messages = require('./routes/messages');
var orders = require('./routes/orders');
var blacks = require('./routes/blacks');
var projects = require('./routes/projects');
var gifts = require('./routes/gifts');
var notifications = require('./routes/notifications');

GLOBAL.moment = require("moment");
GLOBAL._ = require("underscore");
GLOBAL.Q = require('q');

var app = express();

// 设置 view 引擎
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(cookieParser());

if (process.env.LC_APP_ID) {
    var DAO = require('./platforms/leancloud/dao');
} else {
    var DAO = require('./platforms/standalone/dao');
}
GLOBAL.dao = new DAO();
GLOBAL.dao.initialize(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 未处理异常捕获 middleware
app.use(function(req, res, next) {
  var d = null;
  if (process.domain) {
    d = process.domain;
  } else {
    d = domain.create();
  }
  d.add(req);
  d.add(res);
  d.on('error', function(err) {
    console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
    if(!res.finished) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json; charset=UTF-8');
      res.end('uncaughtException');
    }
  });
  d.run(next);
});

// 可以将一类的路由单独保存在一个文件中
app.use('/', home);

app.use('/admin', admin);
app.use('/customers', customers);
app.use('/accounts', accounts);
app.use('/messages', messages);
app.use('/orders', orders);
app.use('/blacks', blacks);
app.use('/gifts', gifts);
app.use('/projects', projects);
app.use('/notifications', notifications);

app.use('/api', api);

process.setMaxListeners(0);

// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Use the LocalStrategy within Passport to login users.
passport.use('local-login', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function(req, username, password, done) {
      var Account = require("./models/account");
      var Helper = require("./routes/helper");

      Account.login(new dao.Account({username:username, password:Helper.md5(password)}), true).then(function(account) {
        if (account.get("role") == 0) {
            app.locals.username = username;
            
            done(null, account);
        } else {
            req.flash('errors', { msg: '只有管理员才能够登录' });
            
            done(null, false, '只有管理员才能够登录');
        }
      }, function (err){
        req.flash('errors', { msg: err.message });
            
        done(null, false, err.message);
      });
    }
));

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { // jshint ignore:line
    var statusCode = err.status || 500;
    if(statusCode === 500) {
      console.error(err.stack || err);
    }
    res.status(statusCode);
    res.render('error', {
      message: err.message || err,
      error: err
    });
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use(function(err, req, res, next) { // jshint ignore:line
  res.status(err.status || 500);
  res.render('error', {
    message: err.message || err,
    error: {}
  });
});

module.exports = app;
