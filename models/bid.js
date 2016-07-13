var Gift = require('./gift');

module.exports.open = function() {
	return Q.Promise(function(resolve, reject, notify) {
		var dt = new Date();
		var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
	
		dao.find("Bid", {'day': today, 'game': 'headline'}, {'order': 'gold DESC', 'limit': 1}).then(function(bids){
	    	if (bids.length > 0) {
				var bid = bids[0];
				bid.set("succeed", 1);
				bid.save().then(function(b) {
					console.log(b.get("customer_id") + "获得了" + today + "的头条");
					resolve();
				}, function(error){
					console.error(error.message);
					reject(error.message);
				});
	    	} else {
				console.error("没有投标");
	    		reject("没有投标");
	    	}
	    }, function(error){
			console.error(error.message);
	    	reject(error.message);
	    });	
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
