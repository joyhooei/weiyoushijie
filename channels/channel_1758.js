
var Helper = require('./helper');

module.exports.getUserInfo = function(gid) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		var sign = "";
		sign += "appKey=90359";
		sign += "&gid=" + gid;
		sign = "&" + crypto.createHash('md5').update(sign).digest('hex');

		var url = "http://wx.1758.com/game/platform/v1.0/user/query";

		var data = {
			appKey: '',
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