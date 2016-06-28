var AV = require('leanengine');
var Helper = require('./helper');

module.exports.rank = function(req, res) {
	var query = new AV.Query(dao.Rank);
	query.equalTo("game", "headline");
	query.addAscending("rank");
	Helper.findAll(query).then(function (ranks) {
		var q = new AV.Query(dao.Customer);
		q.equalTo("game", "headline");
		q.select('objectId');
		q.addDescending("metal");
		q.addDescending("accumulated_gold");
		Helper.findAll(q).then(function(customers){
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

			AV.Object.saveAll(newRanks).then(function (avobjs) {
				console.log("rank succeed " + newRanks.length);
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
