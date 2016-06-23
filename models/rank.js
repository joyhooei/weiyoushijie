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
			for(var i = 0; i < customers.length; i++) {
				if (i > ranks.length) {
					var rank = new dao.Rank({game: "headline", rank: i + 1});
					ranks.push(rank);
				} else {
					var rank = ranks[i];
				}
				
				rank.set({customer_id: customers[i].id, name: customers[i].name, metal: customers[i].metal, accumulated_gold: customers[i].accumulated_gold, avatar: customers[i].avatar});
			}

			AV.Object.saveAll(ranks).then(function (avobjs) {
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