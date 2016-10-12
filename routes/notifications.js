var express = require('express');
var router = express.Router();

var helper = require("./helper");

var _restfulName  = "notifications";

router.get('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.listModel('Notification', "notifications", _restfulName, req, res);	
});

router.get('/new', helper.ensureAuthenticated, function(req, res, next) {
	helper.newModel(new dao.Notification({content: '', deadline: '', action: 0}), "notification", _restfulName, req, res);
});

router.post('/', helper.ensureAuthenticated, function(req, res, next) {
	helper.createModel(new dao.Notification({content: '', deadline: '', action: 0}), "notification", _restfulName, req, res);
});

router.delete('/:id', helper.ensureAuthenticated, function(req, res, next) {
	helper.deleteModel('Notification', _restfulName, "删除了通知", req, res);
});

module.exports = router;
