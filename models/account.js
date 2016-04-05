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
}

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
}

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
}

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
}

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
}