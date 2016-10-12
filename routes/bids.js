var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "bids";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Bid", "bids", _restfulName, req, res);
});

module.exports = router;
