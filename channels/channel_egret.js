
var Helper = require('./helper');

module.exports.getUserInfo = function(data) {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		var now = Date.now();

		var sign = "";
		sign += "appId=90359";
		sign += "time=" + now;
		sign += "token=" + req.body.token;
		sign += "qChCyYzHXFacMrO9fPTFQ";
		sign = crypto.createHash('md5').update(sign).digest('hex');

		var url = "http://api.egret-labs.org/v2/user/getInfo?";
		url += "appId=90359&";
		url += "time=" + now + "&";
		url += "token=" + req.body.token + "&";
		url += "sign=" + sign;

		Helper.post(url, {}).then(function(body){
			resolve(body.data);
		}, function(error){
			reject(error);
		})
	});    	
}