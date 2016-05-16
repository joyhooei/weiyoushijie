var AV = require('leanengine');

var Gift = require('./gift');
var Project = require('./project');

module.exports.offlineGold = function(customer) {
    var now  = moment();
    var last = moment(customer.updatedAt);

    var delta = now.diff(customer.updatedAt, 'seconds');
    var minutes = Math.round((delta / 60) % 60);
    if (minutes == 0) {
        var hours = Math.round(Math.min(8, delta / 3600));
    } else {
        var hours = Math.round(Math.min(7, delta / 3600));
    }			
    var gold = Math.round(0.7 * (hours * 60 * 60 + minutes * 60) * customer.get("output"));

    customer.set({"offline_gold": gold, "offline_hours": hours, "offline_minutes": minutes});
}

module.exports.create = function(uid, name, avatar, sex, age) {
    var customer = new dao.Customer();
    customer.set("uid", uid);
    customer.set("name", name);
    customer.set("avatar", avatar);
    customer.set("sex", sex);
    customer.set("age", age);
    customer.set("gold", 0);
    customer.set("output", 1);
    customer.set("diamond", 100);
    customer.set("metal", 0);
    customer.set("total_hits", 0);
    
    customer.set("offline_gold", 0);
    customer.set("offline_hours", 0);
    customer.set("offline_minutes", 0);
    
    return customer;
}

module.exports.afterSave = function(request, response) {
    var customer = request.object;

    Project.create(customer.id);
    
    //登录200钻。每天领取一次
    Gift.create(customer.id, 1, 200, 0, 0);

    //在线奖励，每天200钻。
    Gift.create(customer.id, 2, 200, 0, 0);

    //拍卖100钻。每天领取一次。灰色点击直接跳去拍卖页面。
    Gift.create(customer.id, 3, 100, 0, 0);

    //永久会员/月票 300钻。每天领取一次。灰色是点击跳入会员购买页面（参照道具弹出窗口） 月票默认30天，会显示剩余月票天数，如果是永久则显示永久
    Gift.create(customer.id, 4, 300, 0, 0);

    //分享100钻。每天任意在微博，微信等地方分享一次就可以领取。灰色时点击跳入分享页面。
    Gift.create(customer.id, 5, 100, 0, 0);
    
    //首冲 1500钻+1勋章+1M 金币。 只能领取一次，不再刷新。灰色时点击跳转首冲页面。
    Gift.create(customer.id, 6, 1500, 1, 1000000);
};

module.exports.beforeUpdate = function(customer) {
   if (moment(customer.get("last_login")) > moment(customer.updatedAt)) {
	  var os = moment().diff(customer.get("last_login"), 'seconds');
   } else {
	  var os = moment().diff(customer.updatedAt, 'seconds');
   }

   customer.increment("online_seconds", os);
}
