var Gift = require('./gift');
var Project = require('./project');
var Message = require('./message');

module.exports.expireTicket = function(request, response) {
    var now = moment();
    
    dao.find("Customer", {'vip': 1}, {'select': ['objectId', 'vip', 'ticket'], limit:100, order: 'update_time ASC'}).then(function(customers){
        var expiredCustomers = [];
        
        _.each(customers, function(customer){
            if (moment(customer.get('ticket')) < now) {
                customer.set('vip', 0);
                customer.set('ticket', '');
                expiredCustomers.push(customer);
            }
        });
        
        if (expiredCustomers.length > 0) {
			AV.Object.saveAll(expiredCustomers).then(function(){
				response.success("expireTicket " + expiredCustomers.length);
			}, function(error) {
				console.error(error.message);
				response.error(error.message);
			});
		} else {
			response.success("expireTicket " + expiredCustomers.length);
		}
    }, function(error) {
        response.error(error.message);
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
    
    Message.send(customer.id, "欢迎加入", "欢迎新的炫舞达人加入，开启走上人生巅峰模式！在努力升级期间，千万别忘了，每天中午12点的头条拍卖哟～\n如果您一不留神拍中了头条，也请保持低调和神秘，要对自己的美艳或帅气只字不提！\n对于明明可以靠脸却偏偏要拼才华的各位，我们特别赠送200钻，不要客气～", "diamond", 200);
    Message.send(customer.id, "特别公告", "呦西～相信您已经对我们的游戏有所了解了。\n公测期间，我们推出同样价格双倍钻石的限时活动，走过路过不要错过哦～", "none", 0);
};

