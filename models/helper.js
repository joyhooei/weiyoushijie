var AV = require('leanengine');

var Gift = require('./gift');
var Project = require('./project');

module.exports.findAll = function(query) {
	return Q.Promise(function(resolve, reject, notify) {
		query.count().then(function(count) {
			if (count <= 0) {
				resolve();
				return;
			}
			
			var total  = 0; 
			var result = [];
			while (total < count) {
				query.skip(total);
				query.limit(1000);
				query.find().done(function(models){
					notify(models);
					
					if (result.length == count) {
						resolve();
					}
				});

				total += 1000;
			}
		});
	});
}