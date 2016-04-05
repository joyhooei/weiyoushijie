var AV = require('leanengine');
var moment = require("moment");

module.exports.send = function(customerId, title, content, entity_type, entity_id) {
    var message = new dao.Message();
    message.set("sender_id", "55e4130760b291d784c31b0f");
    message.set("receiver_id", customerId);
    message.set("entity_type", entity_type);
    message.set("entity_id", entity_id);
    message.set("title", title);
    message.set("content", content);
    message.set("read_yet", 0);
    message.set("category", 1);
    return message.save();
};