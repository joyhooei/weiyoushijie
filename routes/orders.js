var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "orders";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	var query = dao.find("Order", {state: 1}, {order: 'update_time DESC'});
	helper.queryModel(query, "orders", _restfulName, req, res);
});

module.exports = router;