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

module.exports.afterSave = function(request, response) {
    var bid = request.object;

	Gift.unlockBid(bid.get("customer_id"));
};

module.exports.beforeSave = function(request, response) {
    var bid = request.object;

    var query = new AV.Query(dao.Blacklist);
    query.equalTo('customer_id', bid.get("customer_id"));
	query.limit(1);
	query.find().then(function(blacks){
		if (blacks.length == 1) {
			response.error("对不起，您由于下列原因被封号：" + blacks[0].get("reason") + "。请联系管理员，谢谢！");
		} else {
			response.success();
		}
	}, function(error){
		response.success();
	});
};