var Helper = require('./helper');

var Customer = require('../models/customer');

module.exports.login = function(game, options) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		var now = Date.now();

		var data = {
			appId:90359,
			time:now,
			token:options.token;
		}
		data.sign = Helper.sign(data, "qChCyYzHXFacMrO9fPTFQ", "");

		var url = "http://api.egret-labs.org/v2/user/getInfo?" + Helper.join(data, "&");
		Helper.post(url, {}).then(function(body){
			var user = {
				name: body.data.name, 
				uid:body.data.id, 
				avatar:body.data.pic, 
				sex:body.data.sex, 
				age:body.data.age, 
				channel_data: ""
			};
			
			Customer.login(game, user).then(function(account){
				resolve(account)
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
		Helper.pay("egret", options.ext, options.money).then(function(message){
			resolve({code: 0, msg: '支付成功', data: []});
		}, function(message){
			reject({code: 1013, msg: '支付失败', data: []});
		});
	});
}
