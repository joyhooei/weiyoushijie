var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "gifts";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	var query = dao.find("Gift", {customer_id: req.query.customer_id}, {order: 'category ASC'});
	helper.queryModel(query, "gifts", _restfulName, req, res);	
});

module.exports = router;
