var crypto = require('crypto');

var Customer = require('./customer');

function _createAudit(account, operator, category, detail, rewards, result, error){
    try {
		var audit = new dao.Audit();
		
		if (account && account.get("customer_id")) {
			audit.set("customer_id", account.get("customer_id"));
			audit.set("game", account.get("game"));
		} else {
			audit.set("customer_id", '');
			audit.set("game", "");
		}
		audit.set("operator", operator);
		audit.set("category", category);
		audit.set("detail", JSON.stringify(detail));
		audit.set("result", result);
		audit.set("rewards", rewards);
		audit.set("error", error);

		audit.save();
	} catch (err) {
		console.error("_createAudit failed " + JSON.stringify(err));
	}
};

module.exports.succeed = function(account, operator, category, data) {
	if (operator == 'login') {
		var p = _addFreeTicketsAfterLogin(account);
		p.done(function(rewards){
    		_createAudit(account, operator, category, data, rewards, 1, '');
		});
	} else {
    	_createAudit(account, operator, category, data, 0, 1, '');
	}
};

module.exports.failed = function(account, operator, category, data, error) {
    _createAudit(account, operator, category, data, 0, 2, error);
};
