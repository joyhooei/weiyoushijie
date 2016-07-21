var Gift = require('./gift');
var Message = require('./message');

module.exports.open = function(game, today) {
	return Q.Promise(function(resolve, reject, notify) {
		var dt = new Date();
		today = today || (dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate());
		
		console.log("open bid " + game + " " + today);
	
		dao.find("Bid", {'day': today, 'game': game}, {'order': 'gold DESC', 'limit': 10}).then(function(bids){
	    	if (bids.length > 0) {
	    		var promises = [];
	    		
	    		for(var i = 0; i < bids.length; i++) {
	    			var r = i + 1;
	    			
					var bid = bids[i];
					bid.set("succeed", r);
					promises.push(bid.save());
					
					if (r > 1) {
						if (r == 2) {
							var metal = 0.5;
							var diamond = 1500;
						} else if (r == 3) {
							var metal = 0.4;
							var diamond = 1200;
						} else if (r == 4) {
							var metal = 0.3;
							var diamond = 1000;
						} else {
							var metal = 0.2;
							var diamond = 1000;
						}
					
						promises.push(Message.send(bid.get("customer_id"), "拍卖奖励", today + "拍卖，您是第" + r.toString() + '名，请领取钻石奖励，谢谢参与！', "diamond", diamond, game));
						promises.push(Message.send(bid.get("customer_id"), "拍卖奖励", today + "拍卖，您是第" + r.toString() + '名，请领取勋章碎片奖励，谢谢参与！', "metal", metal, game));
					}
	    		}
	    		
	    		Q.all(promises).then(function(results) {
					resolve(bids[0].get("customer_id") + "获得了" + today + "的头条");
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
