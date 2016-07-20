var express = require('express');
var router = express.Router();

var helper = require("./helper");
var Message = require("../models/message");

var _restfulName  = "messages";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Message", "messages", _restfulName, req, res);		
});

router.get('/new', helper.ensureAuthenticated, function(req, res, next) {
	helper.newModel(new dao.Message({title:'', content:'', attach_category:'none', attach_quantity:0, customer_id:req.query.customer_id}), "message", _restfulName, req, res);
});

router.post('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.createModel(new dao.Message({title:'', content:'', attach_category:'none', attach_quantity:0, customer_id:""}), "message", _restfulName, req, res);
});

router.get('/multicast', helper.ensureAuthenticated, function(req, res, next) {
	var options = {};
	options["message"] = new dao.Message({title:'', content:'', attach_category:'none', attach_quantity:0, limit:500, offset:0});
	helper.render(_restfulName + '/multicast', req, res, options);
});

router.post('/multicast', helper.ensureAuthenticated, function(req, res, next) {
	console.log("multicast " + JSON.stringify(req.body));
	
	var conditions = {};
	_.each(req.body, function(v, k) {
		if (k != "content" && k != "title" && k != "attach_category" && k != "attach_quantity" && k != "limit" && k != "offset"){
			if (v.length > 0) {
				if (!isNaN(v)) {
					conditions[k] = +v;
				} else {
					conditions[k] = v;
				}
			}
		}
	});
    
	var filters = {};
	filters.limit  = parseInt(req.body.limit || '500');
	filters.offset = parseInt(req.body.offset || '0');
	filters.order = 'metal DESC, accumulated_gold DESC';
	
	var quantity = parseInt(req.body.attach_quantity || '0');
	var attach = req.body.attach_category || "none";

	console.log('find customers ' + JSON.stringify(conditions) + " " + JSON.stringify(filters));
	
	dao.find('Customer', conditions, filters).then(function(objs){
		var promises = [];
		
        _.each(objs, function(o){
			promises.push(Message.send(o.id, req.body.title, req.body.content, attach, quantity, "headline"));
        });
		
		Q.all(promises).then(function(){
			console.log('给' + promises.length + '个玩家发送了消息' );
			helper.redirect(_restfulName, req, res);
		}, function(error){
			req.flash('errors', { msg: error.message });
			helper.render(_restfulName + '/edit', req, res);
		});	
	}, function(error){
		req.flash('errors', { msg: error.message });			
		helper.render(_restfulName + '/edit', req, res);
	});
})

module.exports = router;