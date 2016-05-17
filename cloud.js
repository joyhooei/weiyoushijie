var AV = require('leanengine');

var Customer = require('./models/customer.js');
var Bid = require('./models/bid.js');

AV.Cloud.afterSave("Customer", function(request, response) {
	Customer.afterSave(request, response);
});

AV.Cloud.define('open_bid', function(request, response) {
	Bid.open(request, response);
});

AV.Cloud.define('timeout_ticket', function(request, response) {
	Customer.timeoutTicket(request, response);
});

module.exports = AV.Cloud;
