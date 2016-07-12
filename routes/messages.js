var express = require('express');
var router = express.Router();

var helper = require("./helper");
var Message = require("../models/message");

var _restfulName  = "mesages";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Message", "mesages", _restfulName, req, res);		
});

router.get('/multicast', helper.ensureAuthenticated, function(req, res, next) {
	helper.newModel(new dao.Message({title:'', content:'', attach_category:'none', attach_quantity:0, limit:500, offset:0}), "mesage", _restfulName, req, res);
});

router.post('/multicast', helper.ensureAuthenticated, function(req, res, next) {
	console.log("multicast " + JSON.stringify(req.body));
	
	var conditions = {};
	_.each(req.body, function(v, k) {
		if (k != "content" && k != "title" && k != "attach_category" && k != "attach_quantity" && k != "limit" && k != "offset"){
			if (!isNaN(v)) {
				conditions[k] = +v;
			} else {
				conditions[k] = v;
			}
		}
	});
    
	var filters = {};
	filters.limit  = parseInt(req.body.limit || '500');
	filters.offset = parseInt(req.body.offset || '0');
	filters.order = 'update_time DESC';
	
	var quantity = parseInt(req.body.attach_quantity || '0');
	var attach = req.body.attach_category || "none";
	
	dao.find('Customer', conditions, filters).then(function(objs){
		var promises = [];
		
        _.each(objs, function(o){
			promises.push(Message.send(o.id, req.body.title, req.body.content, attach, quantity));
        });
		
		Q.all(promises).then(function(){
			Helper.redirect(_restfulName, req, res);
		}, function(error){
			req.flash('errors', { msg: err.message });
			Helper.render(_restfulName + '/edit', req, res);
		});	
	}, function(error){
		req.flash('errors', { msg: err.message });			
		Helper.render(_restfulName + '/edit', req, res);
	});
})

module.exports = router;