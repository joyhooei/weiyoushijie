var AV = require('leanengine');
	
module.exports.pay = function(order) {
	return new AV.Promise(function(resolve, reject){
		if (order.get("product") == "Ticket") {
			_payForTicket(order, resolve, reject);
		} else if (order.get("product") == "VIP") {
			_payForVIP(order, resolve, reject);
		} else if (order.get("product") == "Money") {
			_payForDeposit(order, resolve, reject);
		} else {
			reject(new Error("unknown product " + order.get("product")));
		}
	});
}

function _payForTicket(order, resolve, reject){
	var customerQuery = new AV.Query(dao.Customer);
	customerQuery.get(order.get("customer_id")).then(function(customer){
		customer.set("ticket_expire", moment().add(30, 'days').format());
		customer.save().then(function(c){
			resolve(order);
		}, function(err){
			reject(new Error("_payForTicket save customer " + err.message));
		});
	}, function(err){
		reject(new Error("_payForTicket get customer " + err.message));
	});
};

function _payForVIP(order, resolve, reject){
	var customerQuery = new AV.Query(dao.Customer);
	customerQuery.get(order.get("customer_id")).then(function(customer){
		customer.set("ticket_expire", moment().add(30 * 12 * 100, 'days').format());
		customer.save().then(function(c){
			resolve(order);
		}, function(err){
			reject(new Error("_payForVIP save customer " + err.message));
		});
	}, function(err){
		reject(new Error("_payForVIP get customer " + err.message));
	});
};

function _payForDeposit(order, resolve, reject){
	var customerQuery = new AV.Query(dao.Customer);
	customerQuery.get(order.get("customer_id")).then(function(customer){
		//order.get("price")的单位是分，这里要调整为元，充值需要重新计算金额，因为前面可能使用了折扣
		customer.increment("money", order.get("price") * order.get("quantity"));
		customer.save().then(function(c){
			resolve(order);
		}, function(err){
			reject(new Error("_payForDeposit save customer " + err.message));
		});
	}, function(err){
		reject(new Error("_payForDeposit get customer " + err.message));
	});
};

