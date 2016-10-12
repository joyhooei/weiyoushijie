var Customer = require('../../models/customer.js');
var Bid = require('../../models/bid.js');

dao.afterSave("Customer", function(obj) {
	Customer.afterSave(obj);
});

dao.beforeSave("Bid", function(obj) {
	return Bid.beforeSave(obj);
});

dao.afterSave("Bid", function(obj) {
	Bid.afterSave(obj);
});

