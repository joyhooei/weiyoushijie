var AV = require('leanengine');

var Gift = require('./gift');
var Project = require('./project');
var Helper = require('./helper');

module.exports.expireTicket = function(request, response) {
    var now = moment();
    var expiredCustomers = [];
    
    var query = new AV.Query(dao.Customer);
    
    query.select('objectId', 'vip', 'ticket');
    
    query.equalTo('vip', 1);
    
    var lastday = moment().subtract(48, 'hours');
    query.lessThan("updatedAt", lastday.toDate());
    
    Helper.findAll(query).then(function(count) {
		AV.Object.saveAll(expiredCustomers).then(function(){
			response.succeed("expireTicket " + expiredCustomers.length);
		}, function(error) {
			console.error(error.message);
			response.error(error.message);		
		});
    }, function(error) {
        response.error(error.message);
    }, function(customers) {
        _.each(customers, function(customer){
            if (moment(customer.get('ticket')) < now) {
                customer.set('vip', 0);
                customer.set('ticket', '');
                expiredCustomers.push(customer);
            }
        });
    });
}

module.exports.offlineGold = function(customer) {
    var now  = moment();
    var last = moment(customer.updatedAt);
    
    if ((customer.get("ticket") && customer.get("ticket").length > 1) || customer.get("vip") == 1) {
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

module.exports.create = function(uid, name, avatar, sex, age) {
    var customer = new dao.Customer();
    
    customer.set("uid", uid);
    customer.set("name", name);
    customer.set("avatar", avatar);
    customer.set("sex", sex);
    customer.set("age", age);
    
    customer.set("gold", 0);
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
    
    return customer;
}

module.exports.afterSave = function(request, response) {
    var customer = request.object;

    Project.create(customer);

    Gift.createAll(customer);
};

