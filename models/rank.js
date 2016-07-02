module.exports.rank = function(req, res) {
	dao.findAll("Rank", {"game":"headline"}, {"order":"rank ASC"}).then(function (ranks){
		dao.findAll("Customer", {"game":"headline"}, {"order":"metal DESC, accumulated_gold DESC", 'select':['objectId']}).then(function(customers){
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
				
			res.success("rank succeed " + newRanks.length);

			dao.saveAll(newRanks).then(function (avobjs) {
				console.log("rank " + newRanks.length);				
			}, function (error) {
				console.error("rank saveAll " + error.message);
				res.error(error.message);
			});
		}, function(error){
			console.error("rank findAll customer " + error.message);
			res.error(error.message);
		});
  	}, function (error) {
		console.error("rank findAll rank " + error.message);		
		res.error(error.message);
	});	
}
