var express = require('express');
var router = express.Router();

var AV = require('leanengine');

var helper = require("./helper");
var passport = require('passport');

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	res.render('index');
});

router.get('/client', function(req, res, next) {
	res.json({ip: req.get('x-real-ip')});
});

router.get('/login', function(req, res, next) {
	res.render("login");
});

router.post('/login', function(req, res, next) {
  	passport.authenticate('local-login', function(err, user, info) {
    	if (err) { 
    		return next(err); 
    	}
    	
    	if (!user) { 
    		req.flash('errors', { msg: "未知错误" });
    		return res.redirect('/login'); 
    	}
    	
    	req.login(user, function(err) {
      		if (err) { 
      			return next(err); 
      		}
      		
      		return res.redirect('/');
    	});
  	})(req, res, next);
});

router.get('/logout', helper.ensureAuthenticated, function(req, res, next) {
  	req.logout();
    
  	res.redirect('/login');
});

module.exports = router;
