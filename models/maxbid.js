var Message = require('./message');

module.exports.max = function() {
	return Q.Promise(function(resolve, reject, notify) {
		var dt = new Date();
		if (dt.getHours() >= 12) {
			dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
		}
	
		var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
	
		dao.find("Bid", {day: today, game: 'headline'}, {limit: 100, order: 'gold DESC'}).then(function(bids){
	    	if (bids.length > 0) {
				for (var i = 0; i < bids.length; i ++) {
					var bid = bids[i];
					
					var promises = [];
					
					var diamond = 500;
					if (i == 0) {
						promises.push(_updateMaxBid(bid));
						
						diamond = 2000;
					} else if (i == 1) {
						diamond = 1500;
					} else if (i == 2) {
						diamond = 1200;
					} else if (i < 10) {
						diamond = 1000;
					}
					
					if ((dt.getHours() == 0 && dt.getMinutes() < 5) || (dt.getHours() == 23 && dt.getMinutes() > 55)) {
						promises.push(Message.send(bid.get("customer_id"), "拍卖奖励", today + "凌晨0点，您的拍卖排行是第" + (i + 1).toString() + '名，获得额外奖励，谢谢参与！', "diamond", diamond));
					}
					
					if (promises.length > 0) {
						Q.all(promises).then(function(){
							resolve(today);
						}, function(error){
							console.error("max " + error.message);
					    	reject(error.message);							
						})
					} else {
						resolve(today);
					}
				}
	    	} else {
				console.error("没有投标");
	    		reject("没有投标");
	    	}
	    }, function(error){
			console.error("max find bids " + error.message);
	    	reject(error.message);
	    });	
	});
}

function _updateMaxBid(bid) {
	return Q.Promise(function(resolve, reject, notify) {
		dao.find("MaxBid", {day: bid.get("day"), game:bid.get("game")}, {limit: 1}).then(function(mbs){
			if (mbs.length > 0) {
				var maxbid = mbs[0];
			} else {
				var maxbid = new dao.MaxBid();
				maxbid.set("day", bid.get("day"));
				maxbid.set("game", bid.get("game"));
			}
	
			maxbid.set("gold", bid.get("gold"));
			maxbid.set("customer_id", bid.get("customer_id"));
	
			dao.get("Customer", bid.get("customer_id")).then(function(c){
				maxbid.set("name", c.get("name"));
				maxbid.set("avatar", c.get("avatar"));
				maxbid.save().then(function(){
					resolve();
				}, function(error){
					console.error("max save bid " + error.message);
					reject(error.message);
				});
			}, function(error){
				console.error("max get customer " + error.message);
				reject(error.message);
			});
		});
	});
}
