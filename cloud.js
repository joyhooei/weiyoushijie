var AV = require('leanengine');

var Customer = require('./models/customer.js');

AV.Cloud.afterSave("Customer", function(request, response) {
	Customer.afterSave(request, response);
});

module.exports = AV.Cloud;
