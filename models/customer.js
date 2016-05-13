var AV = require('leanengine');

module.exports.beforeUpdate = function(request, response) {
    var customer = request.object;
	
    if (moment(customer.get("last_login")) > moment(customer.get("updatedAt"))) {
        var os = moment().diff(customer.get("last_login"), 'seconds');
    } else {
        var os = moment().diff(customer.get("updatedAt"), 'seconds');
    }
    
	customer.increment("online_seconds", os);
    customer.set("last_login", moment(customer.get("last_login")).toDate());
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