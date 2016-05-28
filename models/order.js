var AV = require('leanengine');
	
module.exports.pay = function(order) {
	return new AV.Promise(function(resolve, reject){
		var query = new AV.Query(dao.Customer);
		query.get(order.get("customer_id")).then(function(customer){
			customer.increment("charge", order.get("price"));
			
			query = new AV.Query(dao.Order);
			query.equalTo("customer_id", customer.id);
			query.equalTo("product", order.get("product"));
			query.equalTo("state", 1);
			query.count().then(function(count) {
				if (order.get("product") == "Ticket") {
					customer.set("ticket", moment().add(30, 'days').format());
					
					if (count == 0) {
						customer.increment("metal", 1);
					}
				} else if (order.get("product") == "VIP") {
					customer.set("ticket", moment().add(30 * 12 * 100, 'days').format());
					customer.increment("metal", 2);
				} else if (order.get("product") == "Diamond") {
					customer.increment("diamond", 200);
				} else {
					reject(new Error("unknown product " + order.get("product")));

					return;
				}

				customer.save().then(function(c){
					order.set("state", 1);
					resolve(order);
				}, function(err){
					reject(new Error("_payForTicket save customer " + err.message));
				});			
			});
		}, function(err){
			reject(new Error("_payForTicket get customer " + err.message));
		});
	});
}
