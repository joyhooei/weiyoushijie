module.exports.send = function(customerId, title, content, attach, quantity) {
    return Q.Promise(function(resolve, reject, notify) {
		var message = new dao.Message();
		message.set("customer_id", customerId);
		message.set("title", title);
		message.set("content", content);
		message.set("attach_category", attach);
		message.set("attach_quantity", quantity);
		message.set("state", 0);
		message.set("game", "headline");
		message.save().then(function(m){
			resolve(m);
		}, function(error){
			console.error("send message " + JSON.stringify(message) + " failed " + error.message);
			reject(error);
		});
	});
}