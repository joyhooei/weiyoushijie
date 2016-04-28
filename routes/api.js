var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var AV = require('leanengine');

router.get('/egret_rt', function(req, res, next) {
	var content = {
					code_url:'http://headlines.leanapp.cn/mobile/bin-release/native/160411115537/game_code_160411115537.zip', 
					update_url: 'http://headlines.leanapp.cn/mobile/bin-release/native/160411115537', 
					customParams: {
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
	
	var query = new AV.Query(dao.Customer);
	query.equalTo("uid", req.body.userId);
	query.find().then(function(customers){
		if (customers.length > 0) {
			var customer = customers[0];
			
			var order = new dao.Order();
			order.set("oid", req.body.orderId);
			order.set("customer_id", customer.id);
			order.set("cent", parseInt(req.body.money));
			order.set("quantity", parseInt(req.body.ext));
			order.save().then(function(o){
				customer.increment("diamond", parseInt(req.body.ext));
				customer.save().then(function(){
					_succeed(res, {code: 0, msg: '购买钻石成功', data: []});
				}, function(error){
					console.error(error.message);
					_failed(res, {code: 1013, msg: '购买钻石失败', data: []});
				});
			}, function(error){
					console.error(error.message);
				_failed(res, {code: 1013, msg: '保存订单失败', data: []});
			});
		} else {
			console.error('用户不存在');
			_failed(res, {code: 1013, msg: '用户不存在', data: []});
		}
	}, function(error){
		console.error(error.message);
		_failed(res, {code: 1013, msg: '用户不存在', data: []});
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

	console.log(url);
	
	var request = require('request');
	request.post({url:url},function (err, response, body) {
		if (!err && response.statusCode == 200) {
			console.log(body);
			
			var result = JSON.parse(body);
			if (result.code == 0) {
				var query = new AV.Query(dao.Customer);
				query.equalTo("uid", result.data.id);
				query.find().then(function(customers){
					if (customers.length > 0) {
						_succeed(res,  _decode(customers[0]));
					} else {
						var customer = new dao.Customer();
						customer.set("uid", result.data.id);
						customer.set("name", result.data.name);
						customer.set("avatar", result.data.pic);
						customer.set("sex", result.data.sex);
						customer.set("age", result.data.age);
						customer.set("gold", 0);
						customer.set("output", 1);
						customer.set("diamond", 100);
						customer.set("metal", 0);
						customer.save().then(function(){
							_succeed(res, _decode(customer));
						}, function(error){
							_failed(res, error);
						})				
					}
				}, function(error){
					_failed(res, error);
				})
			} else {
				_failed(res, new Error(result.msg));
			}
		} else {
			_failed(res, err);
		}
	});
});

router.post('/offline_gold', function(req, res, next) {
	var query = new AV.Query(dao.Customer);
	query.find(req.body.customer_id).then(function(customer){
		var now  = moment();
		var last = moment(customer.updatedAt);

		var diff = last.diff(now, 'seconds');
		if (diff > 10) {
			var minutes = last.diff(now, 'minutes') % 60;
			if (minutes == 0) {
				var hours = Math.min(8, last.diff(now, 'hours'));
			} else {
				var hours = Math.min(7, last.diff(now, 'hours'));
			}			
			var gold = Math.round(0.7 * (hours * 60 * 60 + minutes * 60) * customer.get("output"));
			_succeed(res, {hours: hours, minutes: minutes, gold:gold});
		} else {
			console.log("offline_gold diff = " + diff);
			_failed(res, new Error('暂时获得没有离线金币'));
		}
	}, function(error) {
		console.log("offline_gold customer = " + req.body.customer_id + " failed " + error.message);
		_failed(res, new Error('用户信息不存在'));
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

function _filterAttributes(req) {
	var forbiddenAttributes = {
		"Customer": ["total_tickets_free", "total_tickets_bought", "total_tickets_task", "money", "blocked"],
		"Player": ["total_likes", "total_tickets", "bonus", "place"]};
		
	if (forbiddenAttributes[req.params.model]) {
		_.each(forbiddenAttributes[req.params.model], function(attr) {
			delete req.body[attr];
		});
	}
};

function _saveModel(model, req, res) {
	_filterAttributes(req);
	
	_encode(model, req.body).save().then(function(m){
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