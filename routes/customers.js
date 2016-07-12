var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "customers";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	var query = dao.find("Customer", {}, {order: 'metal DESC, accumulated_gold DESC'});
	helper.queryModel(query, "customers", _restfulName, req, res);
});

router.get('/new', helper.ensureAuthenticated, function(req, res, next) {
	helper.newModel(new dao.Customer({name:"", mobile:"", wechat:"", gender:1, total_tickets_free:0, total_tickets_task:0, total_tickets_bought:0, money:0, blocked: 0}), "customer", _restfulName, req, res);
});

router.get('/:id', helper.ensureAuthenticated, function(req, res, next) {
	helper.viewModel("Customer", "customer", _restfulName, req, res);		
});

router.get('/:id/edit', helper.ensureAuthenticated, function(req, res, next) {
	helper.editModel("Customer", "customer", _restfulName, req, res);
});

router.post('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.createModel(new dao.Customer({name:"", mobile:"", wechat:"", gender:1, total_tickets_free:0, total_tickets_task:0, total_tickets_bought:0, money:0, blocked: 0}), "customer", _restfulName, req, res);
});

router.post('/:id', helper.ensureAuthenticated, function(req, res, next) {
	helper.updateModel("Customer", "customer", _restfulName, req, res);
});

router.delete('/:id', helper.ensureAuthenticated, helper.upload(), function(req, res, next) {
	helper.deleteModel("Customer", _restfulName, "删除了用户", req, res);
});

module.exports = router;
