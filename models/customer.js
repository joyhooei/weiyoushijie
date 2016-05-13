var AV = require('leanengine');

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