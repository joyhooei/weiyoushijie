var Helper = require('./helper');

module.exports.login = function(options) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		//var url = "http://server.huhuh5.com:8082/dreamspay/appUser/checkToken";
		var url = "http://test.sh.1251228860.clb.myqcloud.com:8082/dreamspay/appUser/checkToken?token=";
		url += encodeURIComponent(options.token);

		Helper.get(url).then(function(body){
			if (body.code == 1) {
				var user = {
					name:  options.userName, 
					uid:   options.userId, 
					avatar:options.userImage, 
					sex:0, 
					age:0, 
					channel_data: options.userPosition
				};
				resolve(user);
			} else {
				reject(new Error(body.message));
			}
		}, function(error){
			reject(error);
		})
	});  	
}

module.exports.pay = function(options) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		dao.get("Order", options.orderId).then(function(order){
			if (order.get("state") != 1) {
				order.set("price", parseInt(options.money));
				order.set("channel", "huhuh5");
				Order.pay(order).then(function(o){
					resolve('succeed');
				}, function(error){
					reject("fail");
				});
			} else {
				resolve('succeed');
			}
		}, function(error){
			console.error("order does not existed " + JSON.stringify(options));
			reject("fail");
		});
	});
}