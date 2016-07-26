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
	Helper.do(Helper.getChannel(req).login(req.body), res);
});

module.exports = router;
