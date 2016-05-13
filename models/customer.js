var AV = require('leanengine');

module.exports.beforeUpdate = function(request, response) {
    var customer = request.object;
	
	customer.increment("online_seconds", moment().diff(customer.get("last_login"), 'seconds'));
    customer.set("last_login", moment().toDate());
    customer.set("last_hit", moment(customer.get("last_hit")).toDate());
    
	response.success();
};

module.exports.afterSave = function(request, response) {
    var customer = request.object;
    
    var project = new dao.Project();
    project.set("customer_id", customer.id);
    project.set("sequence", 0);
    project.set("level", 1);
    project.set("achieve", 0);
    project.set("unlocked", 1);
	project.save();
};