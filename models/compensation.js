var AV = require('leanengine');

module.exports.makeup = function(customer) {
	return Q.Promise(function(resolve, reject, notify) {
		var query = new AV.Query(dao.Compensation);
		query.equalTo("customer_id", customer.id);
		query.equalTo("state", 0);
		query.first().then(function(compensation){
			customer.increment("metal", compensation.get("metal"));
			customer.increment("gold", compensation.get("gold"));
			customer.increment("diamond", compensation.get("diamond"));
			
			compesation.set("state", 1);
			compensation.save();
			
			resolve(customer);
		}, function(error){
			resolve(customer);
		});
	});
}