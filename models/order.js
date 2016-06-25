var AV = require('leanengine');
var Gift = require('./gift');

module.exports.pay = function(order) {
	return new AV.Promise(function(resolve, reject){
		var q = new AV.Query(dao.Order);
		q.equalTo("customer_id", order.get("customer_id"));
		q.equalTo("product", "Ticket");
		q.equalTo("state", 1);
		q.find().then(function(orders){
			var query = new AV.Query(dao.Customer);
			query.get(order.get("customer_id")).then(function(customer){
				var firstCharge = true;
				if (customer.get("charge") > 0) {
					firstCharge = false;
				}

				var price = order.get("price");
				customer.increment("charge", price);

				var product = order.get("product");
				if (product == "VIP") {
					customer.set("vip", 2);
					customer.set("ticket", "");
					customer.increment("diamond", 5000);

					if (orders.length >= 1) {
						customer.increment("metal", 1);
					} else {
						customer.increment("metal", 2);
					}
				} else if (product == "Ticket") {
					customer.set("vip", 1);

					var dt = new Date();
					dt = new Date(dt.getTime() + 1000 * 60 * 60 * 24 * 30);
					customer.set("ticket", dt.toString());
					customer.increment("diamond", 2000);

					if (orders.length >= 1) {
						customer.increment("metal", 0);
					} else {
						customer.increment("metal", 1);
					}
				} else {
					var diamond = 400;
					if (price == 5) {
						diamond = 1200;
					} else if (price == 10) {
						diamond = 2600;
					} else if (price == 30) {
						diamond = 9000;
					} else if (price == 100) {
						diamond = 36000;
					} else if (price == 500) {
						diamond = 200000;
					}

					customer.increment("diamond", diamond);
				}

				customer.save().then(function(c){
					if (firstCharge) {
						Gift.unlockFirstCharge(order.get("customer_id"));
					}

					if (order.get("product") != "Diamond") {
						Gift.unlockTicket(order.get("customer_id"));
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
		}, function(err){
			console.error("pay find order " + order.get("customer_id") + err.message);
			reject(new Error("pay find order " + order.get("customer_id") + err.message));
		});
	});
}