
var request = require('request');

module.exports.post = function(url, data) {
	console.log(url + " " + JSON.stringify(data));

	return Q.Promise(function(resolve, reject, notify) { 
		var options = {
		    url: url,
		    method: 'POST',
		    json:true,
		    body: data
		};

		function callback(error, response, body) {
		    if (!error && response.statusCode == 200) {
		        resolve(body);
		    } else {
		    	reject(new Error(response.statusCode));
		    }
		}

		request(options, callback);
	});	
}
