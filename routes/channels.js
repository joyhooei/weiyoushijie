var express = require('express');
var router  = express.Router();

var Account  = require('../models/account');
var Customer = require('../models/customer');
var Gift     = require('../models/gift');

var Helper   = require('./helper');

router.post('/51h5_pay_url', function(req, res, next) {
	Helper.do(Helper.getChannel(req).payUrl(req.body), res);
});

router.post('/pay', function(req, res, next) {
	Helper.do(Helper.getChannel(req).pay(req.body), res);
});

router.post('/login', function(req, res, next) {
	Helper.getChannel(req).login(req.body).then(function(user){
		Customer.login(req.query.game, user).then(function(account){
			Helper.succeed(res, Helper.decode(account));
		}, function(error){
			Helper.failed(res, new Error("登录失败，请稍后再试"));
		})
	}, function(error){
		console.error("post request failed " + error.message);
		Helper.failed(res, new Error("登录失败，请稍后再试"));
	});
});

module.exports = router;

