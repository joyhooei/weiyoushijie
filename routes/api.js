var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var AV = require('leanengine');

var Gift = require('../models/gift');
var Customer = require('../models/customer');
var Bid = require('../models/bid');
var Order = require('../models/order');
var Helper = require('../models/helper');

router.get('/egret_rt', function(req, res, next) {
	var content = {
					code_url:'http://weiyugame.leanapp.cn/mobile/bin-release/native/160509194453/game_code_160509194453.zip', 
					update_url: 'http://weiyugame.leanapp.cn/mobile/bin-release/native/160509194453/', 
					password:"",   
					customParams: {
						customLoading:0
					}};
					
	res.setHeader('Content-disposition', 'attachment; filename=runtime.json');
	res.setHeader('Content-type', 'text/plain');
	res.charset = 'UTF-8';
	res.write(JSON.stringify(content));
	res.end();
})

router.post('/egret_pay', function(req, res, next) {
	//orderId	是	渠道订单id
	//userId	是	玩家在渠道的用户Id
	//money	是	玩家在渠道上的实际充值金额（大陆统一为人民币元 float类型）
	//ext	是	egret透传参数，此参数在调用渠道支付页面地址时的透传参数，这里是钻石的数量
	//time	是	时间戳
	//sign	是	验证签名，签名生成方式详见附录1
	
    var query = new AV.Query(dao.Order);
	query.get(req.body.ext).then(function(order){
		Order.pay(order).then(function(o){
			order.save().then(function(o){
				_succeed(res, {code: 0, msg: '支付成功', data: []});
			}, function(error){
				console.error(error.message);
				_succeed(res, {code: 0, msg: '支付成功', data: []});
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
	var now = Date.now();

	var sign = "";
	sign += "appId=90240";
	sign += "time=" + now;
	sign += "token=" + req.body.token;
	sign += "ULaMnJJTDY8cPf4lCkY46";
	sign = crypto.createHash('md5').update(sign).digest('hex');

	var url = "http://api.egret-labs.org/v2/user/getInfo?";
	url += "appId=90240&";
	url += "time=" + now + "&";
	url += "token=" + req.body.token + "&";
	url += "sign=" + sign;
	
	var request = require('request');
	request.post({url:url},function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var result = JSON.parse(body);
			if (result.code == 0) {
				var query = new AV.Query(dao.Customer);
				query.equalTo("uid", result.data.id);
				query.equalTo("game", req.query.game);
				query.find().then(function(customers){
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
						var customer = Customer.create(result.data.id, result.data.name, result.data.pic, result.data.sex, result.data.age);
						customer.set("game", req.query.game);
						customer.set("last_login", now.format());
					}
					
					customer.save().then(function(){
						_succeed(res, _decode(customer));
					}, function(error){
						console.error("save customer failed " + error.message);
						_failed(res, error);
					})				
				}, function(error){
					console.error("find customer failed " + error.message);
					_failed(res, error);
				})
			} else {
				console.error("get info failed " + result.msg);
				_failed(res, new Error(result.msg));
			}
		} else {
			console.error("post request failed " + error.message);
			_failed(res, error);
		}
	});
});

router.post('/hits', function(req, res, next) {
	var query = new AV.Query(dao.Customer);
	query.get(req.body.customer_id).then(function(customer){
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

router.post('/rank', function(req, res, next) {
	var all = [];
	
	var query = new AV.Query(dao.Customer);
	query.equalTo("game", req.query.game);
	query.select('objectId', 'name', 'metal', 'diamond');
	query.addDescending("metal");
	Helper.findAll(query).then(function(){
		var index = 0;
		var last = null;
		var me   = null;
		var next = null;
	
		for(var i = 0; i < all.length; i++) {
			if (me) {
				next = all[i];
				break;
			} else {
				if (all[i].id == req.body.customer_id) {
					me = all[i];

					index = i + 1;
				} else {
					last = all[i];
				}
			}
		}

		if (last && next) {
			_succeed(res, [{rank: index - 1, customer: _decode(last)}, {rank: index, customer: _decode(me)}, {rank: index + 1, customer: _decode(next)}]);
		} else if (last) {
			_succeed(res, [{rank: index - 1, customer: _decode(last)}, {rank: index, customer: _decode(me)}, {rank: index + 1, customer: null}]);						
		} else if (next) {
			_succeed(res, [{rank: index - 1, customer: null}, {rank: index, customer: _decode(me)}, {rank: index + 1, customer: _decode(next)}]);
		} else {
			_succeed(res, [{rank: index - 1, customer: null}, {rank: index, customer: _decode(me)}, {rank: index + 1, customer: null}]);						
		}		
	}, function(error){
		_failed(res, error);
	}, function(customers){
		for (var i = 0; i < customers.length; i++) {
			all.push(customers[i]);
		}	
	});
});

router.post('/select/:model', function(req, res, next) {
	var query = new AV.Query(dao[req.params.model]);
	
	if (req.body.filters.limit) {
		query.limit(req.body.filters.limit);
	} else {
		query.limit(1000);
	}
	
	if (req.body.filters.offset) {
		query.skip(req.body.filters.offset);
	} else {
		query.skip(0);
	}
	
	if (req.body.filters.order) {
		var orders = req.body.filters.order.split(",");
		for(var i = 0; i < orders.length; i++) {
			var kv = orders[i].trim().split(" ");
			if (kv.length == 2) {
				var k = kv[0].trim();
				var v = kv[1].trim();

				if (k ==  "create_time") {
					var name = "createdAt";
				} else if (k == "update_time") {
					var name = "updatedAt";
				} else {
					var name = k;
				}

				if (v.toUpperCase() == "ASC") {
					query.addAscending(name);
				} else {
					query.addDescending(name);
				}
			}
		}
	}

	var currentPoint = null;
	if (req.body.conditions.latitude) {
		if (req.body.conditions.latitude != 0) {
			currentPoint = new AV.GeoPoint(req.body.conditions.latitude, req.body.conditions.longitude);
			query.near("location", currentPoint);
		}

		delete req.body.conditions.latitude;
		delete req.body.conditions.longitude;
	}

	_.each(_.keys(req.body.conditions), function(key){
		var value = req.body.conditions[key];

		if (key == 'id') {
			key = 'objectId';
		}

		if (_.isArray(value)) {
			query.containedIn(key, value);
		} else if (_.isObject(value)) {
			_.each(value, function(v, k){
				if (k == "matches"){
					query.matches(key, v, "-i");
				} else {
					query[k](key, v);
				}
			});
		} else {
			query.equalTo(key, value);
		}
	})

	query.find().then(function(results){
		var models = [];
		
		_.each(results, function(avObj){
			var m = _decode(avObj);

			if (req.params.model === 'Media') {
				if (avObj.get("content")) {
					if (req.body.conditions.width) {
						m.url = avObj.get("content").thumbnailURL(req.body.conditions.width, req.body.conditions.height);
					} else {
						m.url = avObj.get("content").url();
					}
				}

				delete m.content;
			}

			if (currentPoint) {
				var newPoint = new AV.GeoPoint(m.get("latitude"), m.get("longitude"));
				m.distance = parseInt(1000 * currentPoint.kilometersTo(newPoint));
			}

			models.push(m);
		})

		_succeed(res, models);
	}, function(error){
		_failed(res, error);
	});
});

router.post('/create/:model', function(req, res, next) {
	_saveModel(new dao[req.params.model](), req, res);
});

router.post('/update/:model/:id', function(req, res, next) {
	var query = new AV.Query(dao[req.params.model]);
	query.get(req.params.id).then(function(m){
		_saveModel(m, req, res);
	}, function(error){
		_failed(res, error);
	});
});

router.post('/delete/:model/:id', function(req, res, next) {
	var query = new AV.Query(dao[req.params.model]);
	query.get(req.params.id).then(function(m){
		m.destroy().then(function(){
			_succeed(res, _decode(m));
		}, function(error) {
			_failed(res, error);
		});
	}, function(error){
		Audit.failed(req.user, 'delete', req.params.model, req.params.id, error.message);
		
		_failed(res, error);
	});
});

function _saveModel(model, req, res) {
	var newModel = _encode(model, req.body);
	
	newModel.save().then(function(m){
		var query = new AV.Query(dao[req.params.model]);
		query.get(m.id).then(function(updatedModel){
			_succeed(res, _decode(updatedModel));
		}, function(error){
			_succeed(res, _decode(m));
		});
	}, function(error){
		_failed(res, error);
	});
};

function _decode(avObj) {
	var attributes = _.extend({"id" : avObj.id}, _.omit(avObj.attributes, ["ACL", "location"]));
	var model = attributes;

	if (_.has(avObj.attributes, 'location')) {
		var location = avObj.get('location');
		model.latitude  = location.latitude;
		model.longitude = location.longitude;
	}

	model.create_time = moment(avObj.createdAt).utc().format("YYYY-MM-DD HH:mm:ss");
	model.update_time = moment(avObj.updatedAt).utc().format("YYYY-MM-DD HH:mm:ss");

	return model;
};

function _encode(model, attrs) {
	var attributes = _.clone(attrs);
	
	if (!_.isUndefined(attributes.latitude)) {
		if (attributes.latitude != 0) {
			var point = new AV.GeoPoint(attributes.latitude, attributes.longitude);
			model.set("location", point);
		}

		delete attributes.latitude;
		delete attributes.longitude;
	}

	delete attributes.create_time;
	delete attributes.update_time;

	model.set(attributes);
	return model;
};

function _succeed(res, data) {
	data = data || {};
	res.status(200).send(data);
};

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send(error.message);
};

module.exports = router;