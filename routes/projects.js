var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "projects";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Project", "projects", _restfulName, req, res);
});

module.exports = router;
