var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "orders";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Order", "orders", _restfulName, req, res);		
});

module.exports = router;