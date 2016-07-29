var crypto = require('crypto');
var request = require('request');

var Order = require('../models/order');

module.exports.post = function(url, data) {
	return Q.Promise(function(resolve, reject, notify) { 
		var options = {
		    url: url,
		    method: 'POST',
		    json:true,
		    body: data
		};

		function callback(error, response, body) {
		    if (!error && response.statusCode == 200) {
				console.log("POST " + url + " " + JSON.stringify(data) + " " + JSON.stringify(body));
	
		        resolve(body);
		    } else {
				console.error("POST " + url + " " + error + " " + response.statusCode + " " + JSON.stringify(body));
			
		    	reject(new Error(response.statusCode));
		    }
		}

		request(options, callback);
	});	
}

module.exports.get = function(url) {
	return Q.Promise(function(resolve, reject, notify) { 
		var options = {
		    url: url,
		    method: 'GET',
		    json:true
		};

		function callback(error, response, body) {
		    if (!error && response.statusCode == 200) {
		        resolve(body);
		    } else {
				console.error("GET " + url + " " + error + " " + response.statusCode + " " + JSON.stringify(body));
			
		    	reject(new Error(response.statusCode));
		    }
		}

		request(options, callback);
	});	
}

module.exports.pay = function(channel, orderId, price, changeProduct) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		dao.get("Order", orderId).then(function(order){
			if (order.get("state") != 1) {
				order.set("price", +price);
				order.set("channel", channel);
				Order.pay(order, changeProduct).then(function(o){
					resolve('pay successfully');
				}, function(error){
					console.error("order pay failed " + channelId + " " + orderId + " " +  error.message);
					reject("pay failed");
				});
			} else {
				resolve('paid yet');
			}
		}, function(error){
			console.error("order does not existed " + channelId + " " + orderId + " " +  error.message);
			reject("order not existed");
		});
	});
}

module.exports.crypto = function(data) {
	return crypto.createHash('md5').update(data).digest('hex');
}

module.exports.join = function(obj, jn) {
	var sign = "";
	
	for (var key of Object.keys(obj).sort()) {
		if (!!!obj[key]) {
			continue;
		}
		
		if (!!!sign.length) {
			sign = key + "=" + obj[key];
		} else {
			sign += (jn + key + "=" + obj[key]);
		}
	}
	
	return sign;
}

