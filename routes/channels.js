var express = require('express');
var router  = express.Router();

var Account  = require('../models/account');
var Customer = require('../models/customer');
var Gift     = require('../models/gift');

var Helper   = require('./helper');

router.post('/51h5_pay_url', function(req, res, next) {
	console.log("51h5_pay_url " + JSON.stringify(req.body) + " " + JSON.stringify(req.query));
	
	Helper.do(Helper.getChannel(req).payUrl(req.body), res);
});

router.post('/pay', function(req, res, next) {
	console.log("pay " + JSON.stringify(req.body) + " " + JSON.stringify(req.query));
	
	Helper.do(Helper.getChannel(req).pay(req.body), res);
});

router.post('/login', function(req, res, next) {
	console.log("login " + JSON.stringify(req.body) + " " + JSON.stringify(req.query));
	
	Helper.getChannel(req).login(req.query.game || "headline", req.body).then(function(account){
		Helper.succeed(res, Helper.decode(account));
	}, function(error){
		Helper.failed(res, error);
	})
});

module.exports = router;

