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

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel("Log", "logs", _restfulName, req, res);
});

router.delete('/:id', helper.ensureAuthenticated, function(req, res, next) {
	helper.deleteModel("Log", _restfulName, "删除了错误日志", req, res);
});

module.exports = router;
