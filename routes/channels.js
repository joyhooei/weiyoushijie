var express = require('express');
var router  = express.Router();

var Account = require('../models/account');
var Customer = require('../models/customer');
var Gift = require('../models/gift');

function _getChannel(req) {
	var channel = req.body.wysj_channel || req.query.wysj_channel || "egret";

	if (channel === "1758") {
		return require("../channels/channel_1758");
	} else if (channel === "huhuh5") {
		return require("../channels/channel_huhuh5");
	} else if (channel === "51h5") {
		return require("../channels/channel_51h5");
	} else {
		return require("../channels/channel_egret");
	}
}

router.post('/51h5_pay_url', function(req, res, next) {
	console.log("51h5_pay_url " + JSON.stringify(req.body));
	
	_getChannel(req).payUrl(req.body).then(function(data){
		_succeed(res, data);
	}, function(data){
		_failed(res, new Error(data));
	});
});

router.post('/pay', function(req, res, next) {
	console.log("egret_pay " + JSON.stringify(req.body));
	
	_getChannel(req).pay(req.body).then(function(data){
		_succeed(res, data);
	}, function(data){
		_failed(res, new Error(data));
	});
});

router.post('/login', function(req, res, next) {
	_getChannel(req).login(req.body).then(function(user){
		dao.find("Customer", {uid: user.uid, "game": req.query.game}).then(function(customers){
			var now = moment();

			if (customers.length > 0) {
				var customer = customers[0];
				
				Customer.offlineGold(customer);
				Customer.hits(customer);

				//一天只会记录一次最早的登录
				if (!moment(customer.get("last_login")).isSame(now, "day")) {
					customer.set("last_login", now.format());

					Gift.unlockLogin(customer);
				}

				_adjustBigNumber(customer.attributes, false);
			} else {
				var customer = Customer.create();
				customer.set("game", req.query.game);
				customer.set("last_login", now.format());
			}

			customer.set(user);
			customer.save().then(function(c){
				Account.update(c.id).then(function(a){
					_succeed(res, _decode(a));
				}, function(error){
					console.error("update token failed " + error.message);
					_failed(res, error);
				});
			}, function(error){
				console.error("login save customer failed " + error.message + " customer is " + JSON.stringify(customer));

				Account.update(customer.id).then(function(a){
					_succeed(res, _decode(a));
				}, function(error){
					console.error("update token failed " + error.message);
					_failed(res, error);
				});
			})
		}, function(error){
			console.error("find customer failed " + error.message);
			_failed(res, new Error("玩家信息不存在，请重新登录"));
		})
	}, function(error){
		console.error("post request failed " + error.message);
		_failed(res, new Error("系统内部错误，请稍后再试"));
	});
});

function _succeed(res, data) {
	data = data || {};
	if (_.isNumber(data)) {
		data = data.toString();
	}
	res.status(200).send(data);
}

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send(error.message);
}

module.exports = router;

