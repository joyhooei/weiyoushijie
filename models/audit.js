var AV = require('leanengine');

var crypto = require('crypto');

var Customer = require('./customer');

function _createAudit(account, operator, clazName, detail, rewards, result, error){
    try {
		var audit = new dao.Audit();
		
		if (account) {
			if (account.id) {
				audit.set("account_id", account.id);
			} else {
				audit.set("account_id", account.objectId);
			}
		} else {
			audit.set("account_id", '');
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
}

function _addFreeTicketsAfterLogin(account) {
	return Q.Promise(
		function(resolve, reject, notify) {
			if (account && account.get("customer_id") && account.get("customer_id").length > 10) {
				var query = new AV.Query(dao.Audit);
				query.equalTo("account_id", account.id);
				query.equalTo("class", "users");
				query.equalTo("operator", "login");
				query.equalTo("result", 1);
				query.notEqualTo("rewards", 0);
				query.limit(1);
				query.addDescending("createdAt")
				query.find().then(function(audits){
					if (audits.length == 1) {
						var now  = moment();
						var last = moment(audits[0].createdAt);
						if (last.dayOfYear() == now.dayOfYear()) {
							//一天内多次登录，只有第一次奖励，后面的都不奖励
							resolve(0);
						} else {
							if (last.dayOfYear() == now.dayOfYear() - 1) {
								var rewards = 1;
								
								//连续多天登录 第一天送1张;第二天2张;第三天3张;第四天5张;第五天7张;第六天9张;第七天12张
								switch (audits[0].get("rewards")) {
									case 1:
										rewards = 2;
										break;
									case 2:
										rewards = 3;
										break;
									case 3:
										rewards = 5;
										break;
									case 5:
										rewards = 7;
										break;
									case 7:
										rewards = 9;
										break;
									case 1:
										rewards = 2;
										break;
									case 9:
										rewards = 12;
										break;
									case 12:
										rewards = 1;
										break;
								}										
								
								Customer.addFreeTickets(account.get("customer_id"), rewards, "每日登录奖励");
								resolve(rewards);
							} else {
								//非连续登录，重新计数
								Customer.addFreeTickets(account.get("customer_id"), 1, "每日登录奖励");
								resolve(1);
							}
						}
					} else {
						Customer.addFreeTickets(account.get("customer_id"), 1, "每日登录奖励");
						resolve(1);
					}
				}, function(err){
					console.error("_addFreeTicketsAfterLogin find audits " + err.message);

					Customer.addFreeTickets(account.get("customer_id"), 1, "每日登录奖励");
					
					resolve(1);
				});
			} else {
				resolve(0);
			}
		});
}

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