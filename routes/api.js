var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var AV = require('leanengine');

var Account = require('../models/account');
var Audit = require("../models/audit");

router.post('/login', function(req, res, next) {
	var appId = 90240;
	var appkey = "ULaMnJJTDY8cPf4lCkY46";
	var token = req.body.token;
	var requestParams = {
		action: "user.getInfo",
		appId: appId,
		serverId: 1,
		time: Date.now(),
		token: token
	};
	
	var signStr = "";
	for (var key in requestParams){
		signStr += key + "=" + requestParams[key];
	}
	
	signStr += appkey;
	requestParams.sign = crypto.createHash('md5').update(signStr).digest('hex');;
	
	var request = require('request');
	request.post({url:"http://api.egret-labs.org/games/api.php", formData: {variables :requestParams}},function (err, response, body) {
		if (!err && response.statusCode == 200) {
			console.log(body);
			
			var account = new Account();
			account.set(body);
			_saveModel(account, req, res);
		} else {
			_failed(res, err);
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
			var kv = $.trim(orders[i]).split(" ");
			if (kv.length == 2) {
				var k = $.trim(kv[0]);
				var v = $.trim(kv[1]);

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
					if (conditions.width) {
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
			Audit.succeed(req.user, 'delete', req.params.model, m);
			
			_succeed(res, _decode(m));
		}, function(error) {
			Audit.failed(req.user, 'delete', req.params.model, m, error.message);
			
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
	
	model.save(req.body).then(function(m){
		Audit.succeed(req.user, 'update', req.params.model, m);
		
		query.get(m.id).then(function(updatedModel){
			_succeed(res, _decode(updatedModel));
		}, function(error){
			_succeed(res, _decode(m));
		});
	}, function(error){
		Audit.failed(req.user, 'update', req.params.model, model, error.message);
		
		_failed(res, error);
	});
};

function _authenticated(account, req, res) {
	try {
		req.login(account, function(error) {
			if (error) { 
				_failed(res, error);
			} else {
				account.set("password", "");
				account.set("transfer_password", "");
				account.set("salt", "");

				_succeed(res, _decode(account));
			}
		});
	} catch (error) {
		_failed(res, error, 401);
	}
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

function _succeed(res, data) {
	data = data || {};
	res.status(200).send(data: data);
};

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send(error: error.message);
};

module.exports = router;