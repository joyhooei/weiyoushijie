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
    _create(customer, 1, 200, 0, 0);

    //在线奖励，每天200钻。
    _create(customer, 2, 200, 0, 0);

    //拍卖100钻。每天领取一次。灰色点击直接跳去拍卖页面。
    _create(customer, 3, 100, 0, 0);

    //永久会员/月票 300钻。每天领取一次。灰色是点击跳入会员购买页面（参照道具弹出窗口） 月票默认30天，会显示剩余月票天数，如果是永久则显示永久
    _create(customer, 4, 300, 0, 0);

    //分享100钻。每天任意在微博，微信等地方分享一次就可以领取。灰色时点击跳入分享页面。
    _create(customer, 5, 100, 0, 0);
    
    //首冲 1500钻+1勋章+1M 金币。 只能领取一次，不再刷新。灰色时点击跳转首冲页面。
    _create(customer, 6, 1500, 1, 1000000);
    
    //秒产每增加一个数量级，就得100个钻石
    _create(customer, 7, 100, 0, 0);
    
    //关注
    _create(customer, 8, 200, 0, 0);
}


//有月票时每天登录可以得到300钻石，否则只有200钻石
module.exports.buyTicket = function(customer) {
    return _update(customer, 1, 300);
}

module.exports.expireTicket = function(customer) {
    return _update(customer, 1, 200);
}

module.exports.unlockLogin = function(customerId) {
    _lock(customerId, 1, 0);
}

module.exports.unlockBid = function(customerId) {
    _lock(customerId, 3, 0);
}

function _create(customer, category, diamond, metal, gold) {
    var gift = new dao.Gift();
    gift.set("customer_id", customer.id);
    gift.set("category", category);
    gift.set("diamond", diamond);
    gift.set("metal", metal);
    gift.set("gold", gold);
    gift.set("locked", 1);
    gift.set("data", "");
    gift.set("game", customer.get("game"));
    return gift.save();
}

function _update(customer, category, diamond) {
     return Q.Promise(function(resolve, reject, notify) {
        var query = new AV.Query(dao.Gift);
        query.equalTo("customer_id", customer.id);
        query.equalTo("category", category);
        query.limit(1);
        query.find().done(function(gifts){
            if (gifts.length > 0) {
                var gift = gifts[0];

                gift.set("diamond", diamond);
                gift.save().then(function(){
                    resolve();
                }, function(error){
                    reject(error);
                });
            } else {
                reject(new Error("cant find gift " + customer.id + " " + category));
            }
        }, function(error){
            reject(error);
        });
    });   
}

function _lock(customerId, category, locked) {
	var query = new AV.Query(dao.Gift);
	query.equalTo("customer_id", customerId);
    query.equalTo("category", category);
    query.find().done(function(gifts){
        if (gifts.length > 0) {
            var gift = gifts[0];
			
            gift.set("locked", locked);
            gift.save();
        }
    });
}