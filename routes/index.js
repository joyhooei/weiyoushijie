var express = require('express');
var router = express.Router();

var helper = require("./helper");
var passport = require('passport');
var Account = require('../models/account');

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	res.render('index');
});

router.get('/login', function(req, res, next) {
	res.render("login");
});

router.get('/pass', helper.ensureAuthenticated, function(req, res, next) {
	res.render("pass");
});

router.post('/pass', function(req, res, next) {
	if (req.body.newPassword1 != req.body.newPassword2) {
		req.flash('errors', { msg: "新密码和新密码验证不一样" });
		return res.redirect('/pass'); 
	}
	
	dao.get("Account", req.user.objectId).then(function(account){
		Account.compare(account, helper.md5(req.body.oldPassword), '').then(function(){
			account.set("password", helper.md5(req.body.newPassword1));
			Account.savePassword(account).then(function(){
				return res.redirect('/');
			}, function(error) {
				req.flash('errors', { msg: error.message });
			 	return res.redirect('/pass'); 
		  	});
		}, function(error) {
			req.flash('errors', { msg: "旧密码不正确" });
		 	return res.redirect('/pass'); 
	  	});
	}, function(error) {
		req.flash('errors', { msg: '账号不存在' });
	  	return res.redirect('/pass'); 
	});
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
