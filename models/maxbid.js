var Message = require('./message');

module.exports.max = function(game, today) {
	return Q.Promise(function(resolve, reject, notify) {
		today = today || _today();
	
		console.log("max " + game + " " + today);
		
		dao.find("Bid", {day: today, game: game}, {limit: 1, order: 'gold DESC'}).then(function(bids){
	    	if (bids.length > 0) {
	    		var bid = bids[0];
	    		
				dao.find("MaxBid", {day: today, game:game}, {limit: 1}).then(function(mbs){
					if (mbs.length > 0) {
						var maxbid = mbs[0];
					} else {
						var maxbid = new dao.MaxBid();
						maxbid.set("day",  today);
						maxbid.set("game", game);
					}
			
					maxbid.set("gold", bid.get("gold"));
					maxbid.set("customer_id", bid.get("customer_id"));
			
					dao.get("Customer", bid.get("customer_id")).then(function(c){
						maxbid.set("name", c.get("name"));
						maxbid.set("avatar", c.get("avatar"));
						maxbid.save().then(function(){
							resolve(today + " max is " + JSON.stringify(c));
						}, function(error){
							console.error("max save maxbid failed " + error.message);
							reject(error.message);
						});
					}, function(error){
						console.error("max get customer " + error.message);
						reject(error.message);
					});
				});
	    	} else {
				console.log(today + "没有投标");
	    		resolve(today + "没有投标");
	    	}
	    }, function(error){
			console.error("max find bids " + error.message);
	    	reject(error.message);
	    });	
	});
}

module.exports.midnight = function(game, today) {
	return Q.Promise(function(resolve, reject, notify) {
		today = today || _today();
	
		console.log("midnight " + game + " " + today);
		
		dao.find("Bid", {day: today, game: game}, {limit: 100, order: 'gold DESC'}).then(function(bids){
				var promises = [];
					
				for (var i = 0; i < bids.length; i ++) {
					var bid = bids[i];
					
					var diamond = 500;
					if (i == 0) {
						diamond = 2000;
					} else if (i == 1) {
						diamond = 1500;
					} else if (i == 2) {
						diamond = 1200;
					} else if (i < 10) {
						diamond = 1000;
					}
					
					promises.push(Message.send(bid.get("customer_id"), "拍卖奖励", "凌晨0点，您的拍卖排行是第" + (i + 1).toString() + '名，获得额外奖励，谢谢参与！', "diamond", diamond));
				}
				
				if (promises.length > 0) {
					Q.all(promises).then(function(){
						resolve("midnight " + today + "=>" + promises.length);
					}, function(error){
						console.error("midnight send message failed " + error.message);
				    	reject(error.message);
					})
				} else {
					resolve("midnight " + today + "=>0");
				}
	    }, function(error){
			console.error("midnight find bids " + error.message);
	    	reject(error.message);
	    });	
	});
}

function _today() {
	var dt = new Date();
	if (dt.getHours() >= 12) {
		dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
	}

	return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
}
