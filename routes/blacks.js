var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "blacks";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Blacklist", "blacks", _restfulName, req, res);
});

router.get('/new', helper.ensureAuthenticated, function(req, res, next) {
	helper.newModel(new dao.Blacklist({reason:'', customer_id:req.query.customer_id}), , "black", _restfulName, req, res);
});

router.post('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.createModel(new dao.Blacklist(), "black", _restfulName, req, res);
});

router.delete('/:id', helper.ensureAuthenticated, function(req, res, next) {
	helper.deleteModel("Blacklist", _restfulName, "删除了黑名单", req, res);
});

module.exports = router;
