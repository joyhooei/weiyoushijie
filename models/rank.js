var AV = require('leanengine');
var Helper = require('./helper');

module.exports.rank = function(req, res) {
	var query = new AV.Query(dao.Rank);
	query.equalTo("game", "headline");
	query.addAscending("rank");
	Helper.findAll(query).then(function (ranks) {
		var q = new AV.Query(dao.Customer);
		q.equalTo("game", "headline");
		q.select('objectId', 'name', 'metal', 'accumulated_gold', 'avatar');
		q.addDescending("metal");
		q.addDescending("accumulated_gold");
		Helper.findAll(q).then(function(customers){
			var newRanks = [];
			
			for(var i = 0; i < customers.length; i++) {
				if (i > ranks.length) {
					var r = new dao.Rank({game: "headline", rank: i + 1});
					ranks.push(r);
				} else {
					var r = ranks[i];
				}
				
				var c = customers[i];
				
				if (r.get("customer_id") != c.id 
					|| r.get("name") != c.get("name") 
					|| r.get("metal") != c.get("metal") 
					|| r.get("accumulated_gold") != c.get("accumulated_gold") 
					|| r.get("avatar") != c.get("avatar")) {
					
					r.set({customer_id: c.id, name: c.name, metal: c.metal, accumulated_gold: c.accumulated_gold, avatar: c.avatar});
					
					newRanks.push(r);
				}
			}

			AV.Object.saveAll(newRanks).then(function (avobjs) {
				res.success("rank succeed");
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

function _createRanks(req, res) {

}