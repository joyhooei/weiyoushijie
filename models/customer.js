var AV = require('leanengine');

var Message = require('./message');

module.exports.createDefault = function(name) {
    var customer = new dao.Customer();
    customer.set("name", name);
    customer.set("birthday", "");
    customer.set("gender", 1);
    customer.set("money", 0);
    customer.set("blocked", 0);

    customer.set("total_tickets_free", 0);
    customer.set("total_tickets_task", 0);
    customer.set("total_tickets_bought", 0);

    customer.set("mobile", '');
    customer.set("wechat", '');
    
    return customer.save();
};

module.exports.addFreeTickets = function(customerId, number, msg) {
	var query = new AV.Query(dao.Customer);
	query.get(customerId).then(function(customer){
		if (customer) {
			customer.increment("total_tickets_free", number);
			customer.save().then(function(){
				Message.send(customerId, msg, "您获得了" + number + "张免费票", "", "");
			}, function(err){
				console.error("addFreeTickets save customer" + err.message);
			});
		} else {
			console.error("addFreeTickets no customer " + customerId);
		}
	}, function(err){
		console.error("addFreeTickets get customer " + err.message);
	});
}