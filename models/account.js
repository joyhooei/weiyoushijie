var AV = require('leanengine');
var crypto = require('crypto');

module.exports.update = function(customer_id) {
	return Q.Promise(function(resolve, reject, notify) {
        var query = new AV.Query(dao.Account);
        query.equalTo("customer_id", customer_id);
        query.find().then(function(accounts){
            if (accounts.length > 0) {
                var account = accounts[0];
            } else {
                var account = new dao.Account();
				account.set("customer_id", customer_id);
            }
            
			account.set("game", "headline");
			_updateToken(account, resolve, reject);
        }, function(error){
			console.error("find account failed " + error.message);
            reject(error);
        });
    });
}

module.exports.check = function(customer_id, token) {
	return Q.Promise(function(resolve, reject, notify) {	
        var query = new AV.Query(dao.Account);
        query.equalTo("customer_id", customer_id);
        query.find().then(function(accounts){
            if (accounts.length > 0) {
                var account = accounts[0];
				
				if (token) {
					if (account.get("token") != token) {
						reject(new Error("错误的token"));
					} else {
						resolve(account);
					}
				} else {
					account.set("customer_id", customer_id);
					account.set("game", "headline");
					_updateToken(account, resolve, reject);
				}
            } else {
				var account = new dao.Account();
				account.set("customer_id", customer_id);
				account.set("game", "headline");
				_updateToken(account, resolve, reject);
			}
        }, function(error){
			console.error("find account failed " + error.message);
            reject(error);
        });
    });
}

function _updateToken(account, resolve, reject) {
	crypto.randomBytes(64, function(error, token) {
		if (error) {
			console.error("new token failed " + error.message);
			reject(error);
		} else {			
			account.set("token", token.toString('hex'));
			account.save().then(function(a){
				resolve(a);
			}, function(error){
				console.error("save account failed " + error.message);
				reject(error);
			});
		}
	});
}
