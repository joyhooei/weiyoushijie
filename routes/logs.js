var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName = "logs";

router.post('/', function(req, res, next) {
	if (req.body.version) {
    	var model = new dao.Log(req.body);
	  	model.save().always( function() {
			res.end();
		});
	} else {
		res.end();
	}
});

module.exports = router;
