var Helper = require('./helper');
var request = require('request');

var Customer = require('../models/customer');

function _post(url, data) {
	return Q.Promise(function(resolve, reject, notify) {
		data.appid = 'fg40249b';

		var temp = Helper.join(data, "&") + "dwdse2tsz70go8dq62pzmj10bpkqh08j";
		var buf = new Buffer(temp);
		temp = buf.toString("binary");
		data.sign  = Helper.crypto(temp);
		request.post({url: url, headers: {'content-type': 'application/x-www-form-urlencoded'}, body: Helper.join(data, "&")}, function(error, response, body){
			try {
			    if (!error && response.statusCode == 200) {
					var result = JSON.parse(body);
					if (result.status == 1) {
						resolve(result);
					} else {
						console.error(url + " failed " + JSON.stringify(data) + " " + body);
						reject(new Error(result.data));						
					}
			    } else {
					console.error(url + " failed " + JSON.stringify(data) + " " + body + " " + response.statusCode);
				
			    	reject(new Error(response.statusCode));
			    }
			} catch(error) {
					console.error(url + " failed " + JSON.stringify(data) + " " + body + " " + error.message);
				
			    	reject(new Error(error.message));
			}
		});
	});
}

module.exports.login = function(game, options) {
	return Q.Promise(function(resolve, reject, notify) {
		_post("http://api.web.51h5.com/auth/token", {code:options.token}).then(function(tokens){
			try {
				_post("http://api.web.51h5.com/auth/info", {token:tokens.data.access_token}).then(function(body){
					try {
						var user = {
							name: body.data.nick, 
							uid:body.data.openid, 
							avatar:body.data.avatar, 
							sex:body.data.gender, 
							age:0, 
							channel_data: tokens.data.refresh_token
						};
						
						Customer.login(game, user).then(function(account){
							resolve(account)
						}, function(error){
							reject(error);
						})
					} catch(error){
						reject(error);
					}
				}, function(error){
					reject(error);
				})	
			} catch (error){
				reject(error);
			}
		}, function(error){
			reject(error);
		})		
	});    	
}

module.exports.payUrl = function(options) {
	return Q.Promise(function(resolve, reject, notify) {
		dao.get("Customer", options.customerId).then(function(customer){
			_post("http://api.web.51h5.com/auth/refresh", {refresh:customer.get('channel_data')}).then(function(tokens){
				customer.set("channel_data", tokens.data.refresh_token);
				customer.save().then(function(c){
					_post("http://api.web.51h5.com/pay/order", {token:tokens.data.access_token, total_fee:options.money, subject:options.goodsName, body:options.goodsName, exten:options.orderId}).then(function(body){
						resolve(body.data.pay_url);
					}, function(error){
						reject(error);
					});
				}, function(error){
					reject(error);
				})
			}, function(error){
				reject(error);
			})
		}, function(error){
			reject(error);
		})		
	});
}

module.exports.pay = function(options) {
	return Q.Promise(function(resolve, reject, notify) {
		Helper.pay("51h5", options.exten, options.amount, false).then(function(message){
			resolve("success");
		}, function(message){
			reject("fail");
		});
	});
}
