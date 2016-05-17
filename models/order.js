var AV = require('leanengine');
	
module.exports.pay = function(order) {
	return new AV.Promise(function(resolve, reject){
		var customerQuery = new AV.Query(dao.Customer);
		customerQuery.get(order.get("customer_id")).then(function(customer){
			customer.increment("charge", order.get("price"));
			
			if (order.get("product") == "Ticket") {
				customer.set("ticket_expire", moment().add(30, 'days').format());
				
				Gift.update(customer.id, 1, 300, 0, 0);
			} else if (order.get("product") == "VIP") {
				customer.set("ticket_expire", moment().add(30 * 12 * 100, 'days').format());
				
				Gift.update(customer.id, 1, 300, 0, 0);
			} else if (order.get("product") == "Diamond") {
				customer.increment("diamond", 200);
			} else {
				reject(new Error("unknown product " + order.get("product")));
				
				return;
			}
			
			customer.save().then(function(c){
				resolve(order);
			}, function(err){
				reject(new Error("_payForTicket save customer " + err.message));
			});			
		}, function(err){
			reject(new Error("_payForTicket get customer " + err.message));
		});
	});
}
