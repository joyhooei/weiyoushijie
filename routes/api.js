var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var Gift = require('../models/gift');
var Customer = require('../models/customer');
var Bid = require('../models/bid');
var Order = require('../models/order');
var Rank = require('../models/rank.js');
var Account = require('../models/account.js');
var Maxbid = require('../models/maxbid.js');
var Nofitication = require('../models/notification.js');

router.get('/open_bid', function(req, res, next) {
	var game = req.query.game || "headline";
	
	Bid.open(game).then(function(result){
		_succeed(res, "open_bid succeed " + result);
	}, function(error){
		_failed(res, error);
	})
})

router.get('/max_bid', function(req, res, next) {
	var game  = req.query.game || "headline";
	var today = req.query.today;
	Maxbid.max(game, today).then(function(result){
		_succeed(res, "max_bid succeed " + result);
	}, function(error){
		_failed(res, error);
	})
})

router.get('/max_midnight', function(req, res, next) {
	var game  = req.query.game || "headline";
	var today = req.query.today;
	Maxbid.midnight(game, today).then(function(result){
		_succeed(res, "max_midnight succeed " + result);
	}, function(error){
		_failed(res, error);
	})
})

router.get('/expire_ticket', function(req, res, next) {
	var game = req.query.game || "headline";
	Customer.expireTicket(game).then(function(result){
		_succeed(res, "expire_ticket succeed " + result);
	}, function(error){
		_failed(res, error);
	})
})

router.get('/expire_notification', function(req, res, next) {
	console.log("expire_notification " + JSON.stringify(req.query));
	
	Nofitication.expire().then(function(result){
		_succeed(res, "expire_notification succeed " + result);
	}, function(error){
		_failed(res, error);
	})
})

router.get('/rank', function(req, res, next) {
	var game = req.query.game || "headline";
	Rank.rank(game).then(function(result){
		_succeed(res, "rank succeed " + result);
	}, function(error){
		_failed(res, error);
	})
})

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

router.post(['/egret_pay', '/pay'], function(req, res, next) {
	console.log("egret_pay " + JSON.stringify(req.body));
	
	_getChannel(req).pay(req.body).then(function(data){
		_succeed(res, data);
	}, function(data){
		_failed(res, new Error(data));
	});
})

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

					Customer.sendVipMetal(customer);
					
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
	})
});

router.post('/hits', function(req, res, next) {
	dao.get("Customer", req.body.customer_id).then(function(customer){
		Customer.hits(customer);
		customer.save().then(function(c){
			_succeed(res, c.get("total_hits"));
		}, function(error){
			console.log("hits customer = " + req.body.customer_id + " failed " + error.message);
			_failed(res, new Error('修改玩家信息失败，请稍后再试'));
		});
	}, function(error) {
		console.log("hits customer = " + req.body.customer_id + " failed " + error.message);
		_failed(res, new Error('玩家信息不存在，请重新登录'));
	});
});

router.post('/select_all/:model', function(req, res, next) {
	dao.findAll(req.params.model, req.body.conditions, req.body.filters).then(function(objs) {
		var models = [];

		for (var i = 0; i < objs.length; i++) {
			models.push(_decode(objs[i]));
		}
		
		_succeed(res, models);
	}, function(error){
		_failed(res, error);
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
	if (req.params.model == "Customer") {
		var customer_id = model.id;
	} else {
		var customer_id = req.body.customer_id;
	}

	if (customer_id && customer_id.length > 1) {
		Account.check(customer_id, req.query.token).then(function(a){
			_filterAttributes(req);

			var newModel = _encode(model, req.body);

			newModel.save().then(function(m){
				dao.get(req.params.model, m.id).then(function(updatedModel){
					_succeed(res, _decode(updatedModel));
				}, function(error){
					console.error("_saveModel get model failed " + error.message + " model is " + JSON.stringify(m));
					_succeed(res, _decode(m));
				});
			}, function(error){
				console.error("_saveModel save failed " + error.message + " req body is " + JSON.stringify(req.body));
				_failed(res, new Error("保存数据失败，请重新登录"));
			});
		}, function(error){
			_failed(res, new Error("您已经在另外一台终端上登录，请下线"));
		});
	} else {
		console.error("_saveModel customer_id is empty " + " req body is " + JSON.stringify(req.body));
		_failed(res, new Error("玩家信息不存在，请重新登录"));
	}
};

function _decode(avObj) {
	try {
		var attributes = _.extend({"id" : avObj.id}, _.omit(avObj.attributes, ["ACL", "location"]));
		var model = attributes;

		model.create_time = moment(avObj.createdAt).format("YYYY-MM-DD HH:mm:ss");
		model.update_time = moment(avObj.updatedAt).format("YYYY-MM-DD HH:mm:ss");
		
		_adjustBigNumber(model, true);

		return model;
	} catch(error) {
		console.error("_decode failed " + error.message);
	}
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
	/*
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
	*/
}

function _succeed(res, data) {
	data = data || {};
	if (_.isNumber(data)) {
		data = data.toString();
	}
	res.status(200).send(data);
};

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send(error.message);
};

module.exports = router;
