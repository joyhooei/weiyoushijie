var Helper = require('./helper');

var Customer = require('../models/customer');

module.exports.login = function(game, options) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		var now = Date.now();

		var sign = "";
		sign += "appId=90359";
		sign += "time=" + now;
		sign += "token=" + options.token;
		sign += "qChCyYzHXFacMrO9fPTFQ";
		sign = Helper.crypto(sign);

		var url = "http://api.egret-labs.org/v2/user/getInfo?";
		url += "appId=90359&";
		url += "time=" + now + "&";
		url += "token=" + options.token + "&";
		url += "sign=" + sign;

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
