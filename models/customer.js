var AV = require('leanengine');

var Gift = require('./gift');
var Project = require('./project');

module.exports.afterSave = function(request, response) {
    var customer = request.object;
    
	Project.create(customer.id);
    
    //登录200钻。每天领取一次
    Gift.create(customer.id, 1, 200, 0, 0);
    //拍卖100钻。每天领取一次。灰色点击直接跳去拍卖页面。
    Gift.create(customer.id, 2, 100, 0, 0);
    //分享100钻。每天任意在微博，微信等地方分享一次就可以领取。灰色时点击跳入分享页面。
    Gift.create(customer.id, 3, 100, 0, 0);
    //永久会员/月票 300钻。每天领取一次。灰色是点击跳入会员购买页面（参照道具弹出窗口） 月票默认30天，会显示剩余月票天数，如果是永久则显示永久
    Gift.create(customer.id, 4, 300, 0, 0);
    //首冲 1500钻+1勋章+1M 金币。 只能领取一次，不再刷新。灰色时点击跳转首冲页面。
    Gift.create(customer.id, 5, 1500, 1, 1000000);
    //关注 200钻。关注我们的微信号或者关注游戏（qq游戏里面再考虑）可以领取。只能领取一次，不再刷新。灰色时点击跳转关注页面。
    Gift.create(customer.id, 6, 200, 0, 0);
    //在线奖励，每天200钻。
    Gift.create(customer.id, 7, 200, 0, 0);
};

module.exports.beforeUpdate = function(customer) {
   if (moment(customer.get("last_login")) > moment(customer.updatedAt)) {
	  var os = moment().diff(customer.get("last_login"), 'seconds');
   } else {
	  var os = moment().diff(customer.updatedAt, 'seconds');
   }

   customer.increment("online_seconds", os);
}
