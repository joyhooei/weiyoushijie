var AV = require('leanengine');
var Gift = require('./gift');

module.exports.pay = function(order) {
	return new AV.Promise(function(resolve, reject){
		var query = new AV.Query(dao.Customer);
		query.get(order.get("customer_id")).then(function(customer){
			var firstCharge = false;
			if (customer.get("charge") == 0) {
				firstCharge = true;
			}
			
			customer.increment("charge", order.get("price"));
			
			customer.save().then(function(c){
				if (firstCharge) {
					Gift.unlockFirstCharge(customer.id);
				}

				order.set("state", 1);
				resolve(order);
			}, function(err){
				console.error("pay save customer " + err.message);
				reject(new Error("pay save customer " + err.message));
			});
		}, function(err){
			console.error("pay get customer " + order.get("customer_id") + err.message);
			reject(new Error("pay get customer " + order.get("customer_id") + err.message));
		});
	});
}