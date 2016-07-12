var express = require('express');
var router = express.Router();

var helper = require("./helper");

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	res.render('admin');
});


module.exports = router;