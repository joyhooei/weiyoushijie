var AV = require('leanengine');

var Helper = require('./helper');

//夜里12点将所有已经获取的礼物的状态修改成锁定
module.exports.lockPicked = function(request, response) {
	var promises = [];
	
	var query = new AV.Query(dao.Gift);
	query.select('objectId', 'locked');
	query.equalTo("locked", 2);
    query.notEqualTo("category", 4);
    query.notEqualTo("category", 6);
	Helper.findAll().then(function(count){
		Q.all(promises).then(function(){
			response.succeed("lockAllPicked " + count);
		}, function(error) {
			console.error(error.message);
			response.error(error.message);		
		});
	}, function(error){
		response.error(error.message);		
	}, function(gifts) {
		_.each(gifts, function(gift){
			gift.set("locked", 1);
			promises.push(gift.save());
		});	
	});
}

module.exports.createAll = function(customer) {
    //登录200钻。每天领取一次
    _create(customer, 1, 200, 0, 0, 0, "");

    //在线奖励，每天200钻。
    _create(customer, 2, 200, 0, 0, 1, "");

    //拍卖100钻。每天领取一次。灰色点击直接跳去拍卖页面。
    _create(customer, 3, 100, 0, 0, 1, "");

    //永久会员/月票 300钻。每天领取一次。灰色是点击跳入会员购买页面（参照道具弹出窗口） 月票默认30天，会显示剩余月票天数，如果是永久则显示永久
    _create(customer, 4, 300, 0, 0, 1, "");

    //分享100钻。每天任意在微博，微信等地方分享一次就可以领取。灰色时点击跳入分享页面。
    _create(customer, 5, 100, 0, 0, 1, "");
    
    //首冲 1500钻+1勋章+1M 金币。 只能领取一次，不再刷新。灰色时点击跳转首冲页面。
    _create(customer, 6, 1500, 1, 1000000, 1, "");
    
    //秒产每增加一个数量级，就得200个钻石
    _create(customer, 7, 200, 0, 0, 1, "100");
    
    //关注
    _create(customer, 8, 200, 0, 0, 1, "");
}

module.exports.unlockLogin = function(customer) {
	if (customer.ticket && customer.ticket.length > 1) {
		_lock(customer.id, 4, 0);
	}
	
    _lock(customer.id, 1, 0);
}

module.exports.unlockBid = function(customerId) {
    _lock(customerId, 3, 0);
}

module.exports.unlockfirstCharge = function(customerId) {
    _lock(customerId, 6, 0);
}

function _create(customer, category, diamond, metal, gold, locked, data) {
    var gift = new dao.Gift();
    gift.set("customer_id", customer.id);
    gift.set("category", category);
    gift.set("diamond", diamond);
    gift.set("metal", metal);
    gift.set("gold", gold);
    gift.set("locked", locked);
    gift.set("data", data);
    gift.set("game", customer.get("game"));
    return gift.save();
}

function _lock(customerId, category, locked) {
	var query = new AV.Query(dao.Gift);
	query.equalTo("customer_id", customerId);
	query.equalTo("category", category);
	query.first().done(function(gift){
		gift.set("locked", locked);
		gift.save();
	});
}