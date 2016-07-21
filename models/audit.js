function _createAudit(account, operator, category, detail, rewards, result, error){
    try {
		var audit = new dao.Audit();
		
		audit.set("customer_id", account.get("customer_id"));
		audit.set("game", account.get("game"));
		audit.set("operator", operator);
		audit.set("category", category);
		audit.set("detail", JSON.stringify(detail));
		audit.set("result", result);
		audit.set("rewards", rewards);
		audit.set("claimed", 0);
		audit.set("error", error);

		return audit.save();
	} catch (err) {
		console.error("_createAudit failed " + JSON.stringify(err));
	}
};

function _loginBonus(account) {
	return Q.Promise(function(resolve, reject, notify) {
		dao.find("Audit", {customer_id:account.get("customer_id"), category:"users", operator:"login", result:1, rewards:{$ne: 0}}, {limit:1, order:"create_time DESC"}).then(function(audits){
			if (audits.length == 1) {
				var audit = audits[0];
				
				var now  = moment();
				var last = moment(audit.createdAt);
				if (last.dayOfYear() == now.dayOfYear()) {
					//一天内多次登录，只有第一次奖励，后面的都不奖励
					resolve(0);
				} else {
					var rewards = 300;
					
					if (last.dayOfYear() == now.dayOfYear() - 1) {
						var rewardData = [300, 500, 800, 1200, 2000, 3000, 5000];
						for(var i = 0; i < rewardData.length - 1; i++) {
							if (audit.get("rewards") == rewardData[i]) {
								rewards = rewardData[i + 1]
							}
						}
					}
					
					resolve(rewards);
				}
			} else {
				resolve(300);
			}
		}, function(err){
			console.error("_loginBonus find audits failed " + err.message);
			resolve(300);
		});
	});
};

module.exports.succeed = function(account, operator, category, data) {
	if (operator == 'login') {
		_loginBonus(account).done(function(rewards){
    		_createAudit(account, operator, category, data, rewards, 1, '');
		});
	} else {
    	_createAudit(account, operator, category, data, 0, 1, '');
	}
};

module.exports.failed = function(account, operator, category, data, error) {
    _createAudit(account, operator, category, data, 0, 2, error);
};
