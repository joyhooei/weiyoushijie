var Helper = require('./helper');

module.exports.getUserInfo = function(gid) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		var sign = "";
		sign += "appKey=9d5c0edbaddd4d4f2e5f6524ba8f026a";
		sign += "&gid=" + gid;
		sign = Helper.crypto(sign);

		var url = "http://wx.1758.com/game/platform/v1.0/user/query";

		var data = {
			appKey: '9d5c0edbaddd4d4f2e5f6524ba8f026a',
			gid: gid,
			sign: sign
		};

		Helper.post(url, data).then(function(body){
			resolve(body.userInfo);
		}, function(error){
			reject(error);
		})
	});    	
}