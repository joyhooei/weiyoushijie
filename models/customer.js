var Gift = require('./gift');
var Project = require('./project');
var Message = require('./message');
var Rank = require('./rank');

module.exports.expireTicket = function(game) {
	return Q.Promise(function(resolve, reject, notify) {
	    var now = moment();
		
		console.log("expire iicket " + game + " " + now.format());
	    
	    dao.find("Customer", {'vip': 1, game:game}, {order: 'update_time ASC'}).then(function(customers){
	        var expiredCustomers = [];
	        
	        _.each(customers, function(customer){
	            if (moment(new Date(customer.get('ticket'))) < now) {
	                customer.set('vip', 0);
	                customer.set('ticket', '');
	                expiredCustomers.push(customer);
	            }
	        });
	        
	        if (expiredCustomers.length > 0) {
				dao.saveAll(expiredCustomers).then(function(){
					resolve("expireTicket " + expiredCustomers.length);
				}, function(error) {
					console.error("expireTicket save " + error.message);
					reject("expireTicket save " + error.message);
				});
			} else {
				resolve("expireTicket " + 0);
			}
	    }, function(error) {
	    	console.error("expireTicket find " + error.message);
	        reject("expireTicket find " + error.message);
	    });
	});
}

module.exports.offlineGold = function(customer) {
    var now  = moment();
    var last = moment(customer.updatedAt);
    
    if (customer.get("vip") > 0) {
		var percent = 0.9;
    	var period = 12;
	} else {
		var percent = 0.7;
		var period = 8;
	}

    var delta = now.diff(customer.updatedAt, 'seconds');
    var minutes = Math.round((delta / 60) % 60);
    if (minutes == 0) {
        var hours = Math.round(Math.min(period, delta / 3600));
    } else {
        var hours = Math.round(Math.min(period - 1, delta / 3600));
    }			
    var gold = Math.round(percent * (hours * 60 * 60 + minutes * 60) * customer.get("output"));

    customer.set({"offline_gold": gold, "offline_hours": hours, "offline_minutes": minutes});
	
	return {"offline_gold": gold, "offline_hours": hours, "offline_minutes": minutes};
}

module.exports.hits = function(customer) {
	var now  = moment();

	if (customer.get("last_hit")) {
		var lastHit = customer.get("last_hit");
	} else {
		var lastHit = customer.createdAt;
	}

	var delta = now.diff(lastHit, 'hours');
	var totalHits  = Math.min(customer.get("total_hits") + Math.floor(delta / 4), 3);

	if (totalHits > customer.get("total_hits")) {
		customer.set("last_hit", moment(lastHit).add(totalHits - customer.get("total_hits"), "hours").format());
		customer.set("total_hits", totalHits);
	} else if (3 == customer.get("total_hits")) {
		customer.set("last_hit", moment().format());
	}
	
	return {"total_hits": totalHits};
}

module.exports.sendVipMetal = function(game) {
	return Q.Promise(function(resolve, reject, notify) {
		console.log("send vip metal " + game + " " + moment().format());
		
		dao.find("Customer", {charge: {$gte:50}, game:game}, {order: 'charge DESC'}).then(function(customers){
			var promises = [];
			
			var data = [
					[0, 0, 0, 10, 0, 0, 0],
					[1, 2, 0.2, 10, 0, 0, 0],
					[2, 10, 0.5, 10, 0, 0, 0],
					[3, 20, 1, 15, 0, 0, 0],
					[4, 30, 2, 20, 0, 0, 0],
					[5, 50, 5, 25, 0.5, 0, 0.1],
					[6, 100, 10, 30, 0.7, 0.9, 0.12],
					[7, 200, 50, 35, 1, 0.99, 0.15],
					[8, 300, 100, 40, 1.2, 0.999, 0.17],
					[9, 500, 500, 45, 1.5, 0.9999, 0.2],
					[10, 800, 800, 50, 1.7, 0.99999, 0.23],
					[11, 1000, 1000, 55, 2, 0.999999, 0.25],
					[12, 2000, 5000,60, 2.2, 0.9999999, 0.3],
					[13, 5000, 50000, 65, 2.5, 0.99999999, 0.4],
					[14, 10000, 1000000, 70, 3, 0.999999999, 0.5],
					[15, 15000, 10000000, 75, 3.5, 0.9999999999, 0.65],
				];
		
			_.each(customers, function(customer){
				var charge = customer.get("charge");
				
				var d = null;
				for (var i = 0; i < data.length; i ++) {
					if (charge >= data[i][1]) {
						d = data[i];
					} else {
						break;
					}
				}		
				if (d && d[6] > 0) {
			    	promises.push(Message.send(customer.id, "VIP奖励", "到目前为止，您总计充值" + charge + "元，是" + d[0] + "级VIP，请领取每天的勋章碎片奖励。", "metal", d[6], customer.get("game")));
				}
			})
			
			if (promises.length > 0) {
	    		Q.all(promises).then(function(results) {
					resolve(moment().format() + '发送了' + promises.length + "条VIP奖励");
				}, function(error){
					console.error(error.message);
					reject(error.message);
				});
			}
		});
	})
}

module.exports.create = function() {
    var customer = new dao.Customer();
    
    customer.set("uid", "");
    customer.set("name", "");
    customer.set("avatar", "");
    customer.set("sex", 0);
    customer.set("age", 0);
    
    customer.set("gold", 0);
    customer.set("earned_gold", 0);
    customer.set("accumulated_gold", 0);
    
    customer.set("diamond", 0);
    customer.set("metal", 0);
	customer.set("charge", 0);
    
    customer.set("output", 1);
    
    customer.set("total_hits", 3);
    customer.set("last_hit", "");
    
    customer.set("ticket", "");
    customer.set("vip", 0);
    
    customer.set("last_login", '');
    
    customer.set("offline_gold", 0);
    customer.set("offline_hours", 0);
    customer.set("offline_minutes", 0);
    
    customer.set("version", "");
    customer.set("channel_data", "");
    
    return customer;
}

module.exports.afterSave = function(customer) {
    Project.create(customer);

    Gift.createAll(customer);
    
    Rank.create(customer);
    
    Message.send(customer.id, "欢迎加入", "欢迎新的炫舞达人加入，开启走上人生巅峰模式！在努力升级期间，千万别忘了，每天中午12点的头条拍卖哟～\n如果您一不留神拍中了头条，也请保持低调和神秘，要对自己的美艳或帅气只字不提！\n对于明明可以靠脸却偏偏要拼才华的各位，我们特别赠送200钻，不要客气～", "diamond", 200, customer.get("game"));
    Message.send(customer.id, "特别公告", "呦西～相信您已经对我们的游戏有所了解了。\n公测期间，我们推出同样价格双倍钻石的限时活动，走过路过不要错过哦～", "none", 0, customer.get("game"));
};

