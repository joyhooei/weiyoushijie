var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var Gift = require('../models/gift');
var Customer = require('../models/customer');
var Bid = require('../models/bid');
var Order = require('../models/order');
var Rank = require('../models/rank');
var Account = require('../models/account');
var Maxbid = require('../models/maxbid');
var Nofitication = require('../models/notification');

var Helper = require('./helper');

router.get('/send_vip_metal', function(req, res, next) {
	Helper.do(Customer.sendVipMetal(req.query.game || "headline"), res);
});

router.get('/open_bid', function(req, res, next) {
	Helper.do(Bid.open(req.query.game || "headline"), res);
});

router.get('/max_bid', function(req, res, next) {
	Helper.do(Maxbid.max(req.query.game || "headline", req.query.today), res);
});

router.get('/expire_ticket', function(req, res, next) {
	Helper.do(Customer.expireTicket(req.query.game || "headline"), res);
});

router.get('/expire_notification', function(req, res, next) {
	Helper.do(Nofitication.expire(req.query.game || "headline"), res);
});

router.get('/rank', function(req, res, next) {
	Helper.do(Rank.rank(req.query.game || "headline"), res);
});

router.get('/egret_rt', function(req, res, next) {
	console.log("egret_rt " + JSON.stringify(req.query));
	
	dao.find("Game", {"game" : req.query.name}, {limit: 1}).then(function(games){
		if (games.length > 0) {
			var game = games[i];
			
			var content = {
							code_url:game.get("code_url"), 
							update_url: game.get("update_url"), 
							customParams: {
							}};

			res.setHeader('Content-disposition', 'attachment; filename=runtime.json');
			res.setHeader('Content-type', 'text/plain');
			res.charset = 'UTF-8';
			res.write(JSON.stringify(content));
			res.end();
		}
	}, function(error){
		Helper.failed(res, error.message);
	});
});

router.post(['/egret_pay', '/pay'], function(req, res, next) {
	Helper.do(Helper.getChannel(req).pay(req.body), res);
});

router.post('/hits', function(req, res, next) {
	dao.get("Customer", req.body.customer_id).then(function(customer){
		Customer.hits(customer);
		customer.save().then(function(c){
			Helper.succeed(res, c.get("total_hits"));
		}, function(error){
			console.log("hits customer = " + req.body.customer_id + " failed " + error.message);
			Helper.failed(res, new Error('修改玩家信息失败，请稍后再试'));
		});
	}, function(error) {
		console.log("hits customer = " + req.body.customer_id + " failed " + error.message);
		Helper.failed(res, new Error('玩家信息不存在，请重新登录'));
	});
});

router.post('/select/:model', function(req, res, next) {
	dao.find(req.params.model, req.body.conditions, req.body.filters).then(function(objs) {
		var models = [];

		for (var i = 0; i < objs.length; i++) {
			models.push(Helper.decode(objs[i]));
		}
		
		Helper.succeed(res, models);
	}, function(error){
		Helper.failed(res, error);
	});
});

router.post('/create/:model', function(req, res, next) {
	_saveModel(new dao[req.params.model](), req, res);
});

router.post('/update/:model/:id', function(req, res, next) {
	dao.get(req.params.model, req.params.id).then(function(m){
		_saveModel(m, req, res);
	}, function(error){
		Helper.failed(res, error);
	});
});

function _filterAttributes(req) {
	var forbiddenAttributes = {
		"Customer": ["charge", "last_login", "channel_data"],
		"Order": ["state"],
		"Bid": ["succeed"],
	};
		
	if (forbiddenAttributes[req.params.model]) {
		_.each(forbiddenAttributes[req.params.model], function(attr) {
			delete req.body[attr];
		});
	}
}

function _saveModel(model, req, res) {
	var customer_id = req.body.customer_id;
	if (req.params.model == "Customer") {
		customer_id = model.id;
	}

	if (customer_id && customer_id.length > 1) {
		Account.check(customer_id, req.query.token).then(function(a){
			_filterAttributes(req);

			var newModel = Helper.encode(model, req.body);

			newModel.save().then(function(m){
				dao.get(req.params.model, m.id).then(function(updatedModel){
					Helper.succeed(res, Helper.decode(updatedModel));
				}, function(error){
					console.error("_saveModel get model failed " + error.message + " model is " + JSON.stringify(m));
					Helper.succeed(res, Helper.decode(m));
				});
			}, function(error){
				console.error("_saveModel save failed " + error.message + " req body is " + JSON.stringify(req.body));
				Helper.failed(res, new Error("保存数据失败，请重新登录"));
			});
		}, function(error){
			Helper.failed(res, new Error("您已经在另外一台终端上登录，请下线"));
		});
	} else {
		console.error("_saveModel customer_id is empty " + " req body is " + JSON.stringify(req.body));
		Helper.failed(res, new Error("玩家信息不存在，请重新登录"));
	}
}

module.exports = router;
