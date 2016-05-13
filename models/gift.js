var AV = require('leanengine');

module.exports.create = function(customerId, category, diamond, metal, gold) {
    var gift = new dao.Gift();
    gift.set("customer_id", customerId);
    gift.set("category", category);
    gift.set("diamond", diamond);
    gift.set("metal", metal);
    gift.set("gold", gold);
    gift.set("unlocked", 1);
	return gift.save();
}

module.exports.unlockAll = function() {
    var query = new AV.Query(dao.Customer);
    query.startWith('ticket', '2');
    
    query.count().then(function(count) {
		query.limit(1000);
		
		var total = 0; 
		while (total < count) {
			query.skip(total);

			var now = moment();
			query.find().done(function(customers){
				_.each(customers, function(customer){
					if (moment(customer.get('ticket')) > now) {
						_lock(customer.id, 4, 0);
					} else {
						customer.set('ticket', '');
						customer.save();
				});
			});
			
			total += 1000;
		}
	});
}

module.exports.lock = function(customerId, category) {
    _lock(customerId, category, 0);
}

module.exports.unlock = function(customerId, category) {
    _lock(customerId, category, 1);
}

function _lock(customerId, category, unlocked) {
	var query = new AV.Query(dao.Gift);
	query.equalTo("customer_id", customerId);
    query.equalTo("category", category);
    query.find().done(function(gifts){
        if (gifts.length > 0) {
            var gift = gifts[0];
			//一天只能领一次
            if (!moment(gift.updatedAt).isSame(moment(), 'day')) {
                gift.set("unlocked", unlocked);
                gift.save();
            }
        }
    });
}