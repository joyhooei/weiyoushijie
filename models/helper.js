var AV = require('leanengine');

module.exports.findAll = function(query) {
	return Q.Promise(function(resolve, reject, notify) {
		query.count().then(function(total) {
			var offset  = 0; 
			var promises = [];
			while (offset < total) {
				promises.push(_query(query, offset, total));
				
				offset += 1000;
			}
			
			if (promises.length > 0) {
				Q.all(promises).then(function(results){
					resolve([].concat.apply([], results));
				}, function(error){
					console.error("Helper Q.all " + error.message);
					reject(error);
				});
			} else {
				console.log("resolve " + total);
				resolve([]);
			}
		}, function(error){
			console.error("Helper findAll count " + error.message);
			reject(error);
		});
	});
}

function _query(query, offset, total) {
	return Q.Promise(function(resolve, reject, notify) {
		query.skip(offset);
		query.limit(1000);
		query.find().then(function(models){
			console.log("notify " + models.length);
			resolve(models);
		}, function(error){
			console.error("Helper findAll find " + error.message);
			reject(error);
		});
	});		
}