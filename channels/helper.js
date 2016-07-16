var crypto = require('crypto');
var request = require('request');
var Order = require('../models/order');

module.exports.post = function(url, data) {
	console.log("POST " + url + " " + JSON.stringify(data));

	return Q.Promise(function(resolve, reject, notify) { 
		var options = {
		    url: url,
		    method: 'POST',
		    json:true,
		    body: data
		};

		function callback(error, response, body) {
			console.log("POST " + url + " " + error + " " + response.statusCode + " " + JSON.stringify(body));
			
		    if (!error && response.statusCode == 200) {
		        resolve(body);
		    } else {
		    	reject(new Error(response.statusCode));
		    }
		}

		request(options, callback);
	});	
}

module.exports.get = function(url) {
	console.log("GET " + url + " " + JSON.stringify(data));

	return Q.Promise(function(resolve, reject, notify) { 
		var options = {
		    url: url,
		    method: 'GET',
		    json:true
		};

		function callback(error, response, body) {
			console.log("GET " + url + " " + error + " " + response.statusCode + " " + JSON.stringify(body));
			
		    if (!error && response.statusCode == 200) {
		        resolve(body);
		    } else {
		    	reject(new Error(response.statusCode));
		    }
		}

		request(options, callback);
	});	
}

module.exports.pay = function(channel, orderId, price) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		dao.get("Order", orderId).then(function(order){
			if (order.get("state") != 1) {
				order.set("price", parseInt(price));
				order.set("channel", channel);
				Order.pay(order).then(function(o){
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