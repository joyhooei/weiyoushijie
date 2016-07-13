var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "gifts";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Gift", "gifts", _restfulName, req, res);
});

module.exports = router;
