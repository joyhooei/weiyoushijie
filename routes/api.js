var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var Gift = require('../models/gift');
var Customer = require('../models/customer');
var Bid = require('../models/bid');
var Order = require('../models/order');

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
		_failed(res, error.message);
	});
})

router.post('/egret_pay', function(req, res, next) {
	//orderId	是	渠道订单id
	//userId	是	玩家在渠道的用户Id
	//money	是	玩家在渠道上的实际充值金额（大陆统一为人民币元 float类型）
	//ext	是	egret透传参数，此参数在调用渠道支付页面地址时的透传参数，这里是钻石的数量
	//time	是	时间戳
	//sign	是	验证签名，签名生成方式详见附录1
	
	console.log("egret_pay " + JSON.stringify(req.body));
	
	dao.get("Order", req.body.ext).then(function(order){
		var price = parseInt(req.body.money);
		order.set("price", price);
		if (price == 49) {
			order.set("product", "VIP");
		} else if (price == 19) {
			order.set("product", "Ticket");
		} else {
			order.set("product", "Diamond");
		}
		
		Order.pay(order).then(function(o){
			order.save().then(function(o){
				_succeed(res, {code: 0, msg: '支付成功', data: []});
			}, function(error){
				console.error(error.message);
				_failed(res, {code: 1013, msg: '支付失败', data: []});
			});
		}, function(error) {
			console.error(error.message);
			_failed(res, {code: 1013, msg: '支付失败', data: []});
		});
	}, function(error){
		console.error(error.message);
		_failed(res, {code: 1013, msg: '订单不存在', data: []});
	});
})

router.post('/login', function(req, res, next) {
	console.log("login " + JSON.stringify(req.body));
	
	var now = Date.now();

	var sign = "";
	sign += "appId=90359";
	sign += "time=" + now;
	sign += "token=" + req.body.token;
	sign += "qChCyYzHXFacMrO9fPTFQ";
	sign = crypto.createHash('md5').update(sign).digest('hex');

	var url = "http://api.egret-labs.org/v2/user/getInfo?";
	url += "appId=90359&";
	url += "time=" + now + "&";
	url += "token=" + req.body.token + "&";
	url += "sign=" + sign;
	
	var request = require('request');
	request.post({url:url},function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var result = JSON.parse(body);
			if (result.code == 0) {
				dao.find("Customer", {uid: result.data.id, "game": req.query.game}).then(function(customers){
					var now = moment();
					
					if (customers.length > 0) {
						var customer = customers[0];
						customer.set("name", result.data.name);
						customer.set("avatar", result.data.pic);
						customer.set("sex", result.data.sex);
						customer.set("age", result.data.age);
						
						Customer.offlineGold(customer);
						Customer.hits(customer);
						
						//一天只会记录一次最早的登录
						if (!moment(customer.get("last_login")).isSame(now, "day")) {
							customer.set("last_login", now.format());
													
							Gift.unlockLogin(customer);
						}
						
						_adjustBigNumber(customer.attributes, false);
					} else {
						var customer = Customer.create(result.data.id, result.data.name, result.data.pic, result.data.sex, result.data.age);
						customer.set("game", req.query.game);
						customer.set("last_login", now.format());
					}
					
					customer.save().then(function(){
						_succeed(res, _decode(customer));
					}, function(error){
						console.error("save customer failed " + error.message);
						_succeed(res, _decode(customer));
					})
				}, function(error){
					console.error("find customer failed " + error.message);
					_failed(res, error);
				})
			} else {
				console.error("getInfo failed " + JSON.stringify(result) + " url = " + url);
				_failed(res, new Error(result.msg));
			}
		} else {
			console.error("post request failed " + error.message);
			_failed(res, error);
		}
	});
});

router.post('/hits', function(req, res, next) {
	dao.get("Customer", req.body.customer_id).then(function(customer){
		Customer.hits(customer);
		customer.save().then(function(c){
			_succeed(res, c.get("total_hits"));
		}, function(error){
			console.log("hits customer = " + req.body.customer_id + " failed " + error.message);
			_failed(res, new Error('修改用户信息失败'));
		});
	}, function(error) {
		console.log("hits customer = " + req.body.customer_id + " failed " + error.message);
		_failed(res, new Error('用户信息不存在'));
	});
});

router.post('/select/:model', function(req, res, next) {
	dao.find(req.params.model, req.body.conditions, req.body.filters).then(function(objs) {
		var models = [];

		for (var i = 0; i < objs.length; i++) {
			models.push(_decode(objs[i]));
		}
		
		_succeed(res, models);
	}, function(error){
		_failed(res, error);
	});
});

router.post('/create/:model', function(req, res, next) {
	_saveModel(new dao[req.params.model](), req, res);
});

router.post('/update/:model/:id', function(req, res, next) {
	dao.get(req.params.model, req.params.id).then(function(m){
		_saveModel(m, req, res);
	}, function(error){
		_failed(res, error);
	});
});

function _filterAttributes(req) {
	var forbiddenAttributes = {
		"Customer": ["charge", "last_login"],
		"Order": ["state"],
		"Bid": ["succeed"],
	};
		
	if (forbiddenAttributes[req.params.model]) {
		_.each(forbiddenAttributes[req.params.model], function(attr) {
			delete req.body[attr];
		});
	}
};

function _saveModel(model, req, res) {
	_filterAttributes(req);
	
	var newModel = _encode(model, req.body);
	
	newModel.save().then(function(m){
		dao.get(req.params.model, m.id).then(function(updatedModel){
			_succeed(res, _decode(updatedModel));
		}, function(error){
			_succeed(res, _decode(m));
		});
	}, function(error){
		console.error("_saveModel failed " + error.message + " model is " + JSON.stringify(newModel));

		_failed(res, error);
	});
};

function _decode(avObj) {
	var attributes = _.extend({"id" : avObj.id}, _.omit(avObj.attributes, ["ACL", "location"]));
	var model = attributes;

	model.create_time = moment(avObj.createdAt).format("YYYY-MM-DD HH:mm:ss");
	model.update_time = moment(avObj.updatedAt).format("YYYY-MM-DD HH:mm:ss");
	
	_adjustBigNumber(model, true);

	return model;
};

function _encode(model, attrs) {
	var attributes = _.clone(attrs);

	delete attributes.create_time;
	delete attributes.update_time;
	
	_adjustBigNumber(attributes, false);

	model.set(attributes);
	return model;
};

function _adjustBigNumber(attributes, toActual) {
	_.each(attributes, function(v, k){
		if (toActual) {	
			if (_.isNumber(v) && v >= 922337203685477580700) {
				attributes[k] = v / 100;
			}
		} else {
			if (_.isNumber(v) && v >= 9223372036854775807) {
				attributes[k] = v * 100;
			}
		}
	});	
}

function _succeed(res, data) {
	data = data || {};
	res.status(200).send(data);
};

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send(error.message);
};

module.exports = router;