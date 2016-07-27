var Helper = require('./helper');

var Customer = require('../models/customer');

function _post(url, data) {
	return Q.Promise(function(resolve, reject, notify) {
		data.appid = 'fg40249b';

		var sign = Helper.join(data, "&") + "dwdse2tsz70go8dq62pzmj10bpkqh08j";
		var buf = new Buffer(sign);
		sign = buf.toString("binary");
		data.sign = Helper.crypto(sign);

		url += "?" + Helper.join(data, "&");
		Helper.post(url, data).then(function(body){
			if (body.status == 1) {
				resolve(body);
			} else {
				console.error(url + " failed " + JSON.stringify(data) + " " + JSON.stringify(body));
				reject(new Error(body.data));						
			}
		}, function(error){
			reject(error);
		})	
	});
}

module.exports.login = function(game, options) {
	return Q.Promise(function(resolve, reject, notify) {
		_post("http://api.web.51h5.com/auth/token", {code:options.token}).then(function(tokens){
			_post("http://api.web.51h5.com/auth/info", {token:tokens.data.access_token}).then(function(body){
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
			}, function(error){
				reject(error);
			})	
		}, function(error){
			reject(error);
		})		
	});    	
}

module.exports.payUrl = function(options) {
	return Q.Promise(function(resolve, reject, notify) {
		dao.get("Customer", options.customer_id).then(function(customer){
			_post("http://api.web.51h5.com/auth/refresh", {refresh:customer.get('channel_data')}).then(function(tokens){
				customer.set("channel_data", tokens.data.refresh_token);
				dao.save("Customer", customer).then(function(c){
					_post("http://api.web.51h5.com/pay/order", {token:tokens.data.access_token, total_fee:options.money, subject:options.goodsName, body:options.goodsName, exten:options.order_id}).then(function(body){
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
		Helper.pay("51h5", options.exten, options.amount).then(function(message){
			resolve("success");
		}, function(message){
			reject("fail");
		});
	});
}
