var crypto = require('crypto');

var Customer = require('./customer');

function _createAudit(account, operator, clazName, detail, rewards, result, error){
    try {
		var audit = new dao.Audit();
		
		if (account && account.get("customer_id")) {
			audit.set("customer_id", account.get("customer_id"));
		} else {
			audit.set("customer_id", '');
		}
		audit.set("operator", operator);
		audit.set("class", clazName);
		audit.set("detail", JSON.stringify(detail));
		audit.set("result", result);
		audit.set("rewards", rewards);
		audit.set("error", error);

		audit.save();
	} catch (err) {
		console.error("_createAudit failed " + JSON.stringify(err));
	}
};

module.exports.succeed = function(account, operator, clazName, data) {
	if (operator == 'login') {
		var p = _addFreeTicketsAfterLogin(account);
		p.done(function(rewards){
    		_createAudit(account, operator, clazName, data, rewards, 1, '');
		});
	} else {
    	_createAudit(account, operator, clazName, data, 0, 1, '');
	}
};

module.exports.failed = function(account, operator, clazName, data, error) {
    _createAudit(account, operator, clazName, data, 0, 2, error);
};
