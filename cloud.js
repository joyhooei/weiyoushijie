var AV = require('leanengine');

var Customer = require('./models/customer.js');
var Bid = require('./models/bid.js');
var MaxBid = require('./models/maxbid.js');
var Gift = require('./models/gift.js');
var Rank = require('./models/rank.js');

AV.Cloud.afterSave("Customer", function(request, response) {
	Customer.afterSave(request, response);
});

AV.Cloud.beforeSave("Bid", function(request, response) {
	Bid.beforeSave(request, response);
});

AV.Cloud.afterSave("Bid", function(request, response) {
	Bid.afterSave(request, response);
});

AV.Cloud.define('open_bid', function(request, response) {
	Bid.open(request, response);
});

AV.Cloud.define('max_bid', function(request, response) {
	MaxBid.max(request, response);
});

AV.Cloud.define('expire_ticket', function(request, response) {
	Customer.expireTicket(request, response);
});

AV.Cloud.define('rank', function(request, response) {
	Rank.rank(request, response);
});

module.exports = AV.Cloud;
