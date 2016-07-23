var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var helper = require("./helper");
var Account = require("../models/account");

var _restfulName  = "accounts";

function _saveUser(user, req, res) {
	user.set("username", req.body.username);
	user.set("password", helper.md5(req.body.password));
	user.set("email", req.body.email);
	user.set("mobile", req.body.mobile);
	
	Account.register(user).then(function(a){
		Audit.succeed(req.user, "register", _restfulName, user);
		
		res.redirect('/' + _restfulName);
	}, function(err) {
		Audit.failed(req.user, "create", _restfulName, user, err.message);
		
		req.flash('errors', { msg: err.message });
		res.render(_restfulName + '/edit', { user: user});
	});
}

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Account", "accounts", _restfulName, req, res);
});

router.get('/new', helper.ensureAuthenticated, function(req, res, next) {
	res.render(_restfulName + '/edit', { user: new dao.Account()});
});

router.post('/', helper.ensureAuthenticated, function(req, res, next) {
	_saveUser(new dao.Account(), req, res);
});

router.post('/:id', helper.ensureAuthenticated, function(req, res, next) {
	dao.get("Account", req.params.id).then(
		function(user){
				_saveUser(user, req, res);
		}, function(err){
				req.flash('errors', { msg: err.message });

				res.render(_restfulName + '/edit', { user: user});		
		});
});

module.exports = router;
