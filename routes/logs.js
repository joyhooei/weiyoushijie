var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName = "logs";

router.post('/', function(req, res, next) {
	if (req.body.version) {
    	var model = new dao.Log();
    	model.set(req.body);
	  	model.save().then( function() {
			res.end();
		}, function(error){
			console.error("post logs failed " + JSON.stringify(req.body) + ' ' + error.message);

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
