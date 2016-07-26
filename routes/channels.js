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
			} else {
				var customer = Customer.create();
				customer.set("game", req.query.game);
				customer.set("last_login", now.format());
			}

			customer.set(user);
			customer.save().then(function(c){
				Account.update(c.id).then(function(a){
					Helper.succeed(res, Helper.decode(a));
				}, function(error){
					console.error("update token failed " + error.message);
					Helper.failed(res, error);
				});
			}, function(error){
				console.error("login save customer failed " + error.message + " customer is " + JSON.stringify(customer));

				Account.update(customer.id).then(function(a){
					Helper.succeed(res, Helper.decode(a));
				}, function(error){
					console.error("update token failed " + error.message);
					Helper.failed(res, error);
				});
			})
		}, function(error){
			console.error("find customer failed " + error.message);
			Helper.failed(res, new Error("玩家信息不存在，请重新登录"));
		})
	}, function(error){
		console.error("post request failed " + error.message);
		Helper.failed(res, new Error("系统内部错误，请稍后再试"));
	});
});

module.exports = router;

