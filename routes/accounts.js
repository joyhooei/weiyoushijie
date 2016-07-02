var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var AV = require('leanengine');

var helper = require("./helper");
var Account = require("../models/account");
var Audit = require("../models/audit");

var _restfulName  = "users";

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
};

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel(dao.Account, "users", _restfulName, req, res);
});

router.get('/:id/bind', helper.ensureAuthenticated, function(req, res, next) {
	var query = new AV.Query(dao.Account);
	query.get(req.params.id).then(
		function(user){
				res.render(_restfulName + '/bind', { user: user});
		}, function(err){
				req.flash('errors', { msg: err.message });

				res.redirect('/' + _restfulName);
		});
});

router.get('/new', helper.ensureAuthenticated, function(req, res, next) {
	res.render(_restfulName + '/edit', { user: new dao.Account()});
});

router.post('/', helper.ensureAuthenticated, function(req, res, next) {
	_saveUser(new dao.Account(), req, res);
});

router.post('/:id/bind', helper.ensureAuthenticated, function(req, res, next) {
	var query = new AV.Query(dao.Account);
	query.get(req.params.id).then(function(user){
		var customerQuery = new AV.Query(dao.Customer);
		if (req.body.name && req.body.name.length > 0) {
			customerQuery.equalTo("name", req.body.name);
		}
		if (req.body.identity && req.body.identity.length > 0) {
			customerQuery.equalTo("identity", parseInt(req.body.identity));
		}
		customerQuery.find().then(function(customers){
			if (customers.length == 0) {
				req.flash('errors', { msg: '没有找到用户信息，请重新输入用户名和编号' });

				res.render(_restfulName + '/bind', { user: user});
			} else if (customers.length > 1) {
				req.flash('errors', { msg: '找到多个用户信息，请重新输入用户名和编号' });

				res.render(_restfulName + '/bind', { user: user});
			} else {
				user.set("customer_id", customers[0].id);
				user.save().then(function(u) {
					res.redirect('/' + _restfulName);
				}, function(err){
					req.flash('errors', { msg: err.message });

					res.render(_restfulName + '/bind', { user: user});		
				});
			}
		}, function(err){
			req.flash('errors', { msg: err.message });

			res.render(_restfulName + '/bind', { user: user});
		});
	}, function(err){
		req.flash('errors', { msg: err.message });

		res.render(_restfulName + '/bind', { user: user});		
	});
});

router.post('/:id', helper.ensureAuthenticated, function(req, res, next) {
	var query = new AV.Query(dao.Account);
	query.get(req.params.id).then(
		function(user){
				_saveUser(user, req, res);
		}, function(err){
				req.flash('errors', { msg: err.message });

				res.render(_restfulName + '/edit', { user: user});		
		});
});

module.exports = router;
