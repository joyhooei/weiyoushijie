module.exports.send = function(customer, tltle, content, attach, quantity) {
    var message = new dao.Message();
    message.set("customer_id", customer.id);
    message.set("tltle", tltle);
    message.set("content", content);
    message.set("attach_category", attach);
    message.set("attach_quantity", quantity);
    message.set("state", 0);
    message.set("game", customer.get("game"));
    return message.save();
}