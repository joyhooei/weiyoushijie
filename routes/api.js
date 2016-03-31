var express = require('express');
var router = express.Router();

var AV = require('leanengine');

var Account = require('../models/account');
var Audit = require("../models/audit");

router.post('/sms/:mobile', function(req, res, next) {
	AV.Cloud.requestSmsCode(req.params.mobile).then(function() {
		_succeed(res);
	}, function(error){
		_failed(res, error);
	});
});

router.post('/register', function(req, res, next) {
    var account = new dao.Account();
	account.set(req.body);
    Account.register(account).then(function(account){
		_authenticated(account, req, res);
	}, function(error){
		_failed(res, error);
	});
});

router.post('/login', function(req, res, next) {
    var account = new dao.Account();
    if (req.body.username) {
	    account.set("username", req.body.username);
		if (req.body.password) {
	    	account.set("password", req.body.password);
			
        	var promise = Account.login(account, false);
		} else if (req.body.token) {
	    	account.set("token", req.body.token);
			
        	var promise = Account.login(account, false);
		} else {
			_failed(res, new Error('请输入登录信息'));
			return;
		}
    } else if (req.body.weichat_code) {
		var request = require('request');
		request('https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=' + req.body.weichat_code + '&grant_type=authorization_code', function (err, response, body) {
			if (!err && response.statusCode == 200) {
				account.set("wechat_uid", body.unionid);

				Account.socialLogin(account).then(
					function(account){
						_authenticated(account, req, res);
					}, function(err){
						_failed(res, error);
					});
			} else {
				_failed(res, error);
			}
		});

		return;
	} else if (req.body.weibo_uid) {
		account.set("weibo_uid", req.body.weibo_uid);
		
    	var promise = Account.socialLogin(account);
	} else if (req.body.wechat_uid) {
		account.set("wechat_uid", req.body.wechat_uid);
		
    	var promise = Account.socialLogin(account);
	} else if (req.body.qq_uid) {			
		account.set("qq_uid", req.body.qq_uid);
		
    	var promise = Account.socialLogin(account);
	} else {
		_failed(res, new Error('请输入登录信息'));
		return;
	}
    
    promise.then(
        function(account){
			_authenticated(account, req, res);
        }, function(err){
            _failed(res, err);
        });
});

router.post('/logout', function(req, res, next) {
	req.logout();
	
	_succeed(res);
});

router.post('/reset', function(req, res, next) {
	if (!_isAuthenticated(req, res)) {
		return;
	}

    var account = new dao.Account();
	account.set("mobile", req.body.mobile);
	if (req.body.password) {
		account.set("password", req.body.password);
	} else if (req.body.transfer_password) {
		account.set("transfer_password", req.body.transfer_password);
	} else {
		_failed(res, new Error('请输入需要修改的密码'));
		
		return;
	}
	
	AV.Cloud.verifySmsCode(req.body.verify_code, req.body.mobile).then(function(){
		Account.reset(account).then(
			function(account){
				_authenticated(account, req, res);
			}, function(err){
				_failed(res, err);
			});
	}, function(err){
		_failed(res, err);
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
	if (!_isAuthenticated(req, res)) {
		return;
	}
	
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
	if (!_isAuthenticated(req, res)) {
		return;
	}
	
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

function _isAuthenticated(req, res) {
	if (req.isAuthenticated()) {
		return true;
	} else {
		_failed(res, new Error("没有权限"), 401);
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
	res.status(200).send({result: 1, data: data});
};

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send({result: 0, error: error.message});
};

module.exports = router;