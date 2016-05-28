var AV = require('leanengine');

module.exports.findAll = function(query) {
	return Q.Promise(function(resolve, reject, notify) {
		query.count().then(function(total) {
			if (total <= 0) {
				resolve(total);
				return;
			}
			
			var offset  = 0; 
			var result = [];
			while (offset < total) {
				query.skip(offset);
				query.limit(1000);
				query.find().then(function(models){
					notify(models);
					
					if (offset + models.length >= total) {
						resolve(count);
					}
				}, function(error){
					console.error("Helper findAll find " + error.message);
					reject(error);
				});

				offset += 1000;
			}
		}, function(error){
			console.error("Helper findAll count " + error.message);
			reject(error);
		});
	});
}