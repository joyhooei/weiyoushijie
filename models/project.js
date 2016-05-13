var AV = require('leanengine');

module.exports.create = function(customerId) {
    var project = new dao.Project();
    project.set("customer_id", customerId);
    project.set("sequence", 0);
    project.set("level", 1);
    project.set("achieve", 0);
    project.set("unlocked", 1);
	return project.save();
}
	
