var AV = require('leanengine');

var Helper = require('./helper');

module.exports.lockAllPicked = function(request, response) {
	var promises = [];
	
	var query = new AV.Query(dao.Gift);
	query.equalTo("locked", 2);
	Helper.findAll().then(function(count){
		promises.all().then(function(){
			response.succeed("lockAllPicked " + count);
		}, function(error) {
			console.error(error.message);
			response.error(error.message);		
		});
	}, function(error){
		console.error(error.message);
		response.error(error.message);		
	}, function(gifts) {
		_.each(gifts, function(gift){
			gift.set("locked", 1);
			promises.push(gift.save());
		});	
	});
}

module.exports.create = function(customerId, category, diamond, metal, gold) {
    var gift = new dao.Gift();
    gift.set("customer_id", customerId);
    gift.set("category", category);
    gift.set("diamond", diamond);
    gift.set("metal", metal);
    gift.set("gold", gold);
    gift.set("locked", 1);
    gift.set("data", "");
	return gift.save();
}

module.exports.update = function(customerId, category, diamond, metal, gold) {
	var query = new AV.Query(dao.Gift);
	query.equalTo("customer_id", customerId);
    query.equalTo("category", category);
    query.find().done(function(gifts){
		if (gifts.length > 0) {
			var gift = gifts;
			
			gift.set("diamond", diamond);
			gift.set("metal", metal);
			gift.set("gold", gold);
			gift.save();
		}
	});
}

module.exports.lock = function(customerId, category) {
    _lock(customerId, category, 1);
}

module.exports.unlock = function(customerId, category) {
    _lock(customerId, category, 0);
}

model.exports.unlockLogin = function(customerId) {
    _lock(customerId, 1, 0);
}

model.exports.unlockBid = function(customerId) {
    _lock(customerId, 3, 0);
}

function _lock(customerId, category, locked) {
	var query = new AV.Query(dao.Gift);
	query.equalTo("customer_id", customerId);
    query.equalTo("category", category);
    query.find().done(function(gifts){
        if (gifts.length > 0) {
            var gift = gifts[0];
			
            gift.set("locked", locked);
            gift.save();
        }
    });
}