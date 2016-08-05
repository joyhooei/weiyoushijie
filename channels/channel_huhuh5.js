var Helper = require('./helper');

var Customer = require('../models/customer');

module.exports.login = function(game, options) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		var url = "http://server.huhuh5.com:8082/dreamspay/appUser/checkToken?token=";
		//var url = "http://test.sh.1251228860.clb.myqcloud.com:8082/dreamspay/appUser/checkToken?token=";
		url += encodeURIComponent(options.token);

		Helper.get(url).then(function(body){
			try {
				if (body.code == 1) {
					var user = {
						name:  options.userName, 
						uid:   options.userId, 
						avatar:options.userImage, 
						sex:0, 
						age:0
					};
					
					Customer.login(game, user).then(function(account){
						resolve(account)
					}, function(error){
						reject(error);
					})
				} else {
					reject(new Error(body.msg));
				}
			} catch (error) {
				console.error("login failed " + error.message);
				reject(error);
			}
		}, function(error){
			reject(error);
		})
	});  	
}

module.exports.pay = function(options) {
	return Q.Promise(function(resolve, reject, notify) {
		Helper.pay("huhuh5", options.orderId, options.money, true).then(function(message){
			resolve('succeed');
		}, function(message){
			reject("fail");
		});
	});
}
