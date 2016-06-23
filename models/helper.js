var AV = require('leanengine');

module.exports.findAll = function(query) {
	return Q.Promise(function(resolve, reject, notify) {
		query.count().then(function(total) {
			if (total <= 0) {
				console.log("resolve " + total);
				resolve(total);
				return;
			}
			
			var offset  = 0; 
			var result = [];
			while (offset < total) {
				query.skip(offset);
				query.limit(1000);
				query.find().then(function(models){
					console.log("notify " + models.length);
					notify(models);
					
					if (offset + models.length >= total) {
						console.log("resolve " + total);
						resolve(total);
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