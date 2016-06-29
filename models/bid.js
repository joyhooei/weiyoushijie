var Gift = require('./gift');

module.exports.open = function(request, response) {
	var dt = new Date();
	var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

	dao.find("Bid", {'day': today, 'game': 'headline'}, {'order': 'gold DESC', 'limit': 1}).then(function(bids){
    	if (bids.length > 0) {
			var bid = bids[0];
			bid.set("succeed", 1);
			bid.save().then(function(b) {
				console.log(b.get("customer_id") + "获得了" + today + "的头条");
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

module.exports.max = function(request, response) {
	var dt = new Date();
	if (dt.getHours() >= 12) {
		dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
	}

	var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

	dao.find("Bid", {'day': today, 'game': 'headline'}, {'order': 'gold DESC', 'limit': 1}).then(function(bids){
    	if (bids.length > 0) {
			var bid = bids[0];
			
			dao.find("MaxBid", {'day': today, 'game': bid.get("game")}, {'limit': 1}).then(function(mbs){
				if (mbs.length > 0) {
					var maxbid = mbs[0];
				} else {
					var maxbid = new dao.MaxBid();
					maxbid.set("day", today);
					maxbid.set("game", bid.get("game"));
				}
				
				maxbid.set("gold", bid.get("gold"));
				maxbid.set("customer_id", bid.get("customer_id"));
				
				dao.get("Customer",bid.get("customer_id")).then(function(c){
					maxbid.set("name", c.get("name"));
					maxbid.set("avatar", c.get("avatar"));
					maxbid.save().then(function(){
						response.success();
					}, function(error){
						console.error("max save bid " + error.message);
						response.error(error.message);				
					});
				}, function(error){
					console.error("max get customer " + error.message);
					response.error(error.message);
				});
			});
    	} else {
			console.error("没有投标");
    		response.error();
    	}
    }, function(error){
		console.error("max find bids " + error.message);
    	response.error(error.message);
    });	
}

module.exports.afterSave = function(bid) {
	Gift.unlockBid(bid.get("customer_id"));
};

module.exports.beforeSave = function(bid) {
	return Q.Promise(function(resolve, reject, notify) {
		dao.find("Blacklist", {'customer_id': bid.get("customer_id")}, {'limit': 1}).then(function(blacks){
			if (blacks.length == 1) {
				reject.error(new Error("对不起，您由于下列原因被封号：" + blacks[0].get("reason") + "。请联系管理员，谢谢！"));
			} else {
				resolve();
			}
		}, function(error){
			resolve();
		});
	});
};