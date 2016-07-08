var Helper = require('./helper');

function _crypto(info){
	return Helper.crypto(info + "");
}
module.exports.getUserInfo = function(uid) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		var sign = "";
		sign += "appKey=9d5c0edbaddd4d4f2e5f6524ba8f026a";
		sign += "&gid=" + uid;
		sign = _crypto(sign);

		var url = "http://wx.1758.com/game/platform/v1.0/user/query";

		var data = {
			appKey: '9d5c0edbaddd4d4f2e5f6524ba8f026a',
			userToken: token,
			sign: sign
		};

		Helper.post(url, data).then(function(body){
			if (body.code == 0) {
				resolve(body.userInfo);
			} else {
				reject(new Error(body.code));
			}
		}, function(error){
			reject(error);
		})
	});    	
}

module.exports.login = function(token) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		var sign = "";
		sign += "appKey=9d5c0edbaddd4d4f2e5f6524ba8f026a";
		sign += "&userToken=" + token;
		sign = _crypto(sign);

		var url = "http://wx.1758.com/game/platform/v1.0/user/verify";

		var data = {
			appKey: '9d5c0edbaddd4d4f2e5f6524ba8f026a',
			userToken: token,
			sign: sign
		};

		Helper.post(url, data).then(function(body){
			if (body.code == 0) {
				resolve({name: body.userInfo.nickName, uid:body.userInfo.gid, pic:body.userInfo.avatar, sex:0, age:0});
			} else {
				reject(new Error(body.code));
			}
		}, function(error){
			reject(error);
		})
	});    	
}

module.exports.pay = function(options) {
	return Q.Promise(function(resolve, reject, notify) {
		dao.get("Order", options.txId).then(function(order){
			if (order.get("state") != 1) {
				order.set("price", parseInt(options.totalFee));
				order.set("channel", "1758");
				Order.pay(order).then(function(o){
					resolve('succeed');
				}, function(error){
					reject(error);
				});
			} else {
				resolve('success_already');
			}
		}, function(error){
			reject(error);
		});
	});
}