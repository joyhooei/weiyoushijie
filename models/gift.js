var AV = require('leanengine');

module.exports.create = function(customerId, category, diamond, metal, gold) {
    var gift = new dao.Gift();
    gift.set("customer_id", customerId);
    gift.set("category", category);
    gift.set("diamond", diamond);
    gift.set("metal", metal);
    gift.set("gold", gold);
    gift.set("unlocked", 1);
	return gift.save()；
}
