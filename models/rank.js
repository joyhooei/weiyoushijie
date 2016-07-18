module.exports.rank = function() {
	return Q.Promise(function(resolve, reject, notify) {
		dao.findAll("Rank", {"game":"headline"}, {"order":"rank ASC"}).then(function (ranks){
			dao.findAll("Customer", {"game":"headline"}, {"order":"metal DESC, accumulated_gold DESC"}).then(function(customers){
				var newRanks = [];
				
				for(var i = 0; i < customers.length; i++) {
					var c = customers[i];
					
					if (i >= ranks.length) {
						newRanks.push(new dao.Rank({game: "headline", rank: i + 1, customer_id: c.id}));
					} else {
						var r = ranks[i];
						if (r.get("customer_id") != c.id) {
							r.set("customer_id", c.id);
							newRanks.push(r);
						}
					}
				}

				dao.saveAll(newRanks).then(function (avobjs) {
					console.log("rank " + newRanks.length);	
					resolve(newRanks.length);
				}, function (error) {
					console.error("rank saveAll " + error.message);
					reject(error.message);
				});
			}, function(error){
				console.error("rank findAll customer " + error.message);
				reject(error.message);
			});
	  	}, function (error) {
			console.error("rank findAll rank " + error.message);		
			reject(error.message);
		});	
	});
}

module.exports.create = function(customer) {
	dao.count("Customer", {}, {}),then(function(count){
		var rank = new dao.Rank();
		rank.set("customer_id", customer.id);
		rank.set("rank", count);
		rank.save();
	})
}
