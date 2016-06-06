var AV = require('leanengine');

var Gift = require('./gift');

module.exports.open = function(request, response) {
	var dt = new Date();
	var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

    var query = new AV.Query(dao.Bid);
    query.equalTo('day', today);
	query.equalTo('game', 'headline');
    query.addDescending("gold");
	query.limit(1);
    query.find().then(function(bids){
    	if (bids.length > 0) {
			var bid = bids[0];
			bid.set("succeed", 1);
			bid.save().then(function(b) {
				var query = new AV.Query(dao.Customer);
				query.get(bid.get("customer_id")).then(function(customer) {
					customer.increment("gold", 0 - bid.get("gold"));
					customer.increment("metal", 1);
					customer.increment("diamond", 2000);
					customer.save().then(function(c){
						console.log(customer.get("name") + "获得了" + today + "的头条");
    					response.success();
					}, function(error){
						console.error(error.message);
						response.error(error.message);
					});
				}, function(error) {
					console.error(error.message);
					response.error(error.message);
				});
			}, function(error){
				console.error(error.message);
				response.error(error.message);
			});
    	} else {
			console.error("没有投标");
    		response.error();
    	}
    }, function(error){
		console.error(error.message);
    	response.error(error.message);
    });	
}

module.exports.max = function(request, response) {
	var dt = new Date();
	var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

    var query = new AV.Query(dao.Bid);
    query.equalTo('day', today);
	query.equalTo('game', 'headline');
    query.addDescending("gold");
	query.limit(1);
    query.find().then(function(bids){
    	if (bids.length > 0) {
			var bid = bids[0];
			
			var q = new AV.Query(dao.MaxBid);
			q.equalTo('day', today);
			q.equalTo('game', bid.get("game"));
			q.limit(1);
			q.find().then(function(mbs){
				if (mbs.length > 0) {
					var maxbid = mbs[0];
				} else {
					var maxbid = new dao.MaxBid();
					maxbid.set("day", today);
					maxbid.set("game", bid.get("game"));
				}
				
				maxbid.set("gold", bid.get("gold"));
				maxbid.set("customer_id", bid.get("customer_id");
				maxbid.save().then(function(){
					response.success();
				}, function(error){
					console.error(error.message);
					response.error(error.message);				
				});
    	} else {
			console.error("没有投标");
    		response.error();
    	}
    }, function(error){
		console.error(error.message);
    	response.error(error.message);
    });	
}

module.exports.afterSave = function(request, response) {
    var bid = request.object;

	Gift.unlockBid(bid.get("customer_id"));
};