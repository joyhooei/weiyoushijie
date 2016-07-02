var AV = require('leanengine');

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
				Audit.succeed(a, 'login', 'users', a.get("username"));	
				
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
	var nameQuery = new AV.Query(dao.Account);
	nameQuery.equalTo("username", account.get("username"));
	nameQuery.find().then(function(accounts){
		if (accounts.length > 0) {
			reject(new Error("用户名已经存在"));
		} else {
			if (account.get("mobile") && account.get("mobile").length > 0) {
				//如果有手机号码，必须唯一
				var mobileQuery = new AV.Query(dao.Account);
				mobileQuery.equalTo("mobile", account.get("mobile"));
				mobileQuery.find().then(function(accounts){
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

module.exports.reset = function(account) {
	var self = this;
	
	return Q.Promise(
		function(resolve, reject, notify) {
			var query = new AV.Query(dao.Account);
			query.equalTo("mobile", account.get("mobile"));
			query.find().then(function(accounts){
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
			var query = new AV.Query(dao.Account);
			query.equalTo("username", a.get("username"));
			query.find().then(function(accounts){
				if (accounts.length > 0) {
					var account = accounts[0];
					
					if (backend || (account.has("customer_id") && account.get("customer_id").length > 1)) {
						if (a.has("password")) {
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
					reject(new Error("用户名不存在"));
				}
			});		
		});    	
};

module.exports.socialLogin = function(a) {
	var self = this;
	
	return Q.Promise(
		function(resolve, reject, notify) {
			var query = new AV.Query(dao.Account);
			
			if (a.has("weibo_uid")) {
				query.equalTo("weibo_uid", a.get("weibo_uid"));
			} else if (a.has("wechat_uid")) {
				query.equalTo("wechat_uid", a.get("wechat_uid"));
			} else if (a.has("qq_uid")) {
				query.equalTo("qq_uid", a.get("qq_uid"));
			} else {
				reject(new Error("没有第三方用户信息"));
				
				return;
			}
			
			query.find().then(function(accounts){
				if (accounts.length > 0) {
					Audit.succeed(accounts[0], 'login', 'users', accounts[0].get("username"));	
					
					resolve(accounts[0]);
				} else {
					reject(new Error("用户不存在"));
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
