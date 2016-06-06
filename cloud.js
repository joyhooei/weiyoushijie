var AV = require('leanengine');

var Customer = require('./models/customer.js');
var Bid = require('./models/bid.js');
var Gift = require('./models/gift.js');

AV.Cloud.afterSave("Customer", function(request, response) {
	Customer.afterSave(request, response);
});

AV.Cloud.afterSave("Bid", function(request, response) {
	Bid.afterSave(request, response);
});

AV.Cloud.define('open_bid', function(request, response) {
	Bid.open(request, response);
});

AV.Cloud.define('max_bid', function(request, response) {
	Bid.max(request, response);
});

AV.Cloud.define('expire_ticket', function(request, response) {
	Customer.expireTicket(request, response);
});

AV.Cloud.define('lock_picked', function(request, response) {
	Gift.lockPicked(request, response);
});

module.exports = AV.Cloud;
