var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "audits";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Audit", "audits", _restfulName, req, res);
});

module.exports = router;
