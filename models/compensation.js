var AV = require('leanengine');

module.exports.makeup = function(customer) {
	return Q.Promise(function(resolve, reject, notify) {
		var query = new AV.Query(dao.Compensation);
		query.equalTo("customer_id", customer.id);
		query.first().then(function(compensation){
			customer.increment("metal", compensation.get("metal"));
			customer.increment("gold", compensation.get("gold"));
			customer.increment("diamond", compensation.get("diamond"));
			
			if (compensation.get("vip") >= customer.get("vip")) {
				customer.set("vip", compensation.get("vip"));
				customer.set("ticket", compensation.get("ticket"));
			}
			
			compensation.destroy();
			
			resolve(customer);
		}, function(error){
			resolve(customer);
		});
	});
}