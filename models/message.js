module.exports.send = function(customerId, title, content, attach, quantity, game) {
	return _send(new dao.Message(), customerId, title, content, attach, quantity, game);
}

module.exports.sendWith = function(message, customerId, title, content, attach, quantity, game) {
	return _send(message, customerId, title, content, attach, quantity, game);
}

function _send(message, customerId, title, content, attach, quantity) {
	game = game || "headline";
	
    return Q.Promise(function(resolve, reject, notify) {
		message.set("customer_id", customerId);
		message.set("title", title);
		message.set("content", content);
		message.set("attach_category", attach);
		message.set("attach_quantity", quantity);
		message.set("state", 0);
		message.set("game", game);
		message.save().then(function(m){
			resolve(m);
		}, function(error){
			console.error("send message " + JSON.stringify(message) + " failed " + error.message);
			reject(error);
		});
	});	
}