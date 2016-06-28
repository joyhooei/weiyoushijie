module.exports.send = function(customerId, title, content, attach, quantity) {
    var message = new dao.Message();
    message.set("customer_id", customerId);
    message.set("title", title);
    message.set("content", content);
    message.set("attach_category", attach);
    message.set("attach_quantity", quantity);
    message.set("state", 0);
    message.set("game", "headline");
    return message.save();
}