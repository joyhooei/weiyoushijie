var AV = require('leanengine');

var Customer = require('../../models/customer.js');
var Bid = require('../../models/bid.js');
var Gift = require('../../models/gift.js');
var Rank = require('../../models/rank.js');

AV.Cloud.afterSave("Customer", function(request, response) {
	Customer.afterSave(request.object);
});

AV.Cloud.beforeSave("Bid", function(request, response) {
	Bid.beforeSave(request.object).then(function(){
		response.success();
	}, function(error){
		response.error(error.message);
	});
});

AV.Cloud.afterSave("Bid", function(request, response) {
	Bid.afterSave(request.object);
});

AV.Cloud.define('open_bid', function(request, response) {
	Bid.open().then(function(result){
		response.success(result);
	}, function(error){
		response.error(error);
	});
});

AV.Cloud.define('max_bid', function(request, response) {
	Bid.max().then(function(result){
		response.success(result);
	}, function(error){
		response.error(error);
	});
});

AV.Cloud.define('expire_ticket', function(request, response) {
	Customer.expireTicket().then(function(result){
		response.success(result);
	}, function(error){
		response.error(error);
	});
});

AV.Cloud.define('rank', function(request, response) {
	Rank.rank().then(function(result){
		response.success(result);
	}, function(error){
		response.error(error);
	});
});

module.exports = AV.Cloud;
