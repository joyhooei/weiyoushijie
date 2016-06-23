var AV = require('leanengine');

module.exports.rank = function(req, res) {
	AV.Query.doCloudQuery('delete from Rank where game = "headline"').then(function () {
		var q = new AV.Query(dao.Customer);
		q.equalTo("game", "headline");
		q.select('objectId', 'name', 'metal', 'accumulated_gold', 'avatar');
		q.addDescending("metal");
		q.addDescending("accumulated_gold");
		Helper.findAll(q).then(function(customers){
			var ranks = [];
			for(var i = 0; i < customers.length; i++) {
				ranks.push(new Rank({customer_id: customers[i].id, rank: i + 1, game: "headline", name: customers[i].name, metal: customers[i].metal, accumulated_gold: customers[i].accumulated_gold, avatar: customers[i].avatar}));
			}
			
			AV.Object.saveAll(ranks).then(function (avobjs) {
				res.success("rank succeed");
			}, function (error) {
				console.error("rank saveAll " + error.message);

				res.error(error.message);
			});
		}, function(error){
			console.error("rank findAll " + error.message);
			
			res.error(error.message);
		});		
  	}, function (error) {
		console.error("rank doCloudQuery " + error.message);
		
		res.error(error.message);
	});	
}