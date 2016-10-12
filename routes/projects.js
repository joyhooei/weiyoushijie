var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "projects";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	var query = dao.find("Project", {customer_id: req.query.customer_id}, {order: 'sequence ASC'});
	helper.queryModel(query, "projects", _restfulName, req, res);
});

module.exports = router;
