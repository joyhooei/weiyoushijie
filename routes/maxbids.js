var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "maxbids";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Maxbid", "maxbids", _restfulName, req, res);
});

module.exports = router;
