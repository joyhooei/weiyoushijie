var express = require('express');
var router = express.Router();

var AV = require('leanengine');

var helper = require("./helper");

var _restfulName  = "customers";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	var query = new AV.Query(dao.Customer);
	query.limit(1000);
	query.equalTo("blocked", 0);
	query.addAscending("role");
	query.addDescending("updatedAt");
	query.addAscending("name");
	helper.queryModel(dao.Customer, query, "customers", _restfulName, req, res);		
});

router.get('/new', helper.ensureAuthenticated, function(req, res, next) {
	helper.newModel(new dao.Customer({name:"", mobile:"", wechat:"", gender:1, total_tickets_free:0, total_tickets_task:0, total_tickets_bought:0, money:0, blocked: 0}), "customer", _restfulName, req, res);
});

router.get('/:id', helper.ensureAuthenticated, function(req, res, next) {
	helper.viewModel(dao.Customer, "customer", _restfulName, req, res);		
});

router.get('/:id/edit', helper.ensureAuthenticated, function(req, res, next) {
	helper.editModel(dao.Customer, "customer", _restfulName, req, res);
});

router.post('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.createModel(new dao.Customer({name:"", mobile:"", wechat:"", gender:1, total_tickets_free:0, total_tickets_task:0, total_tickets_bought:0, money:0, blocked: 0}), "customer", _restfulName, req, res);
});

router.post('/:id', helper.ensureAuthenticated, function(req, res, next) {
	helper.updateModel(dao.Customer, "customer", _restfulName, req, res);
});

router.delete('/:id', helper.ensureAuthenticated, helper.upload(), function(req, res, next) {
	helper.deleteModel(dao.Customer, _restfulName, "删除了用户", req, res);
});

router.post('/apply/:id', helper.ensureAuthenticated, helper.upload(), function(req, res, next) {
	var query = new AV.Query(dao.Customer);
	query.get(req.params.id).then(
		function(customer){
			var Beauty = require("../models/beauty");
			Beauty.createDefault(customer.get("name")).then(function(b){
				customer.set("beauty_id", b.id);
				customer.save().then(function(c){
					res.redirect('/' + _restfulName + '/' + customer.id);
				}, function(err){
					req.flash('errors', { msg: err.message });
		
					res.redirect('/' + _restfulName + '/' + customer.id);					
				})
			}, function(err){
				req.flash('errors', { msg: err.message });
	
				res.redirect('/' + _restfulName + '/' + customer.id);				
			})
		}, function(err){
			req.flash('errors', { msg: err.message });

			res.redirect('/' + _restfulName + '/' + req.params.id);
		});
});


module.exports = router;
