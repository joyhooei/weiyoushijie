var AV = require('leanengine');

var Message = require('./message');

module.exports.max = function(request, response) {
	var dt = new Date();
	if (dt.getHours() >= 12) {
		dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
	}

	var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

    var query = new AV.Query(dao.Bid);
    query.equalTo('day', today);
	query.equalTo('game', 'headline');
    query.addDescending("gold");
	query.limit(1);
    query.find().then(function(bids){
    	if (bids.length > 0) {
			for (var i = 0; i < bids.length; i ++) {
				var bid = bids[i];
				
				var diamond = 500;
				if (i == 0) {
					_updateMaxBid(bid);
					
					diamond = 2000;
				} else if (i == 1) {
					diamond = 1500;
				} else if (i == 2) {
					diamond = 1200;
				} else if (i < 10) {
					diamond = 1000;
				}
				
				if ((dt.getHours() == 0 && dt.getMinutes() < 5) || (dt.getHours() == 23 && dt.getMinutes() > 55)) {
					Message.send(bid.get("customer_id"), "拍卖奖励", "到凌晨0点为止，您的拍卖排行是第" + (i + 1).toString() + '名，获得额外奖励，谢谢参与！', "diamond", diamond);
				}
			}
    	} else {
			console.error("没有投标");
    		response.error();
    	}
    }, function(error){
		console.error("max find bids " + error.message);
    	response.error(error.message);
    });	
}

function _updateMaxBid(bid) {
	var q = new AV.Query(dao.MaxBid);
	q.equalTo('day', bid.get("day"));
	q.equalTo('game', bid.get("game"));
	q.limit(1);
	q.find().then(function(mbs){
		if (mbs.length > 0) {
			var maxbid = mbs[0];
		} else {
			var maxbid = new dao.MaxBid();
			maxbid.set("day", bid.get("day"));
			maxbid.set("game", bid.get("game"));
		}

		maxbid.set("gold", bid.get("gold"));
		maxbid.set("customer_id", bid.get("customer_id"));

		var qry = new AV.Query(dao.Customer);
		qry.get(bid.get("customer_id")).then(function(c){
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
}