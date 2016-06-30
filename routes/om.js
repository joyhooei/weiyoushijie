var express = require('express');
var router = express.Router();

router.get('/multicast', function(req, res, next) {
    var AV = require('leanengine');
    var leanDAO = require('../platforms/leancloud/dao');
	
	var conditions = {};
	_.each(req.query, function(v, k) {
		if (k != title && k != attach && k != quantity && k != test){
			conditions[k] = v;
		}
	});
    
	leanDAO.findAll('Customer', conditions, {}).then(function(objs){
		var promises = [];
		
		var html = "<h1>Multicast to: <h1>";
        _.each(objs, function(o){
			if (req.query.test) {
				promises.push(Q.Promise(function(resolve, reject, notify) {
					resolve();
				}));
			} else {
				var Message = require('../models/message');

				promises.push(Message.send(o.id, '系统公告', req.query.title, req.query.attach, req.query.quantity));
			}
			
			html += "<p>" + o.get("name") + "</p>";
        });
		
		Q.all(promises).then(function(){
			res.status(200).send(html);
		}, function(error){
			console.error(error.message);			
			_failed(res, error.message);
		});	
	}, function(error){
	});
})

router.get('/clear/:model', function(req, res, next) {
	dao.clear(req.params.model).then(function(p){
		_succeed(res, "clear " + req.params.model + " number is " + p);
	}, function(error){
		console.error(error.message);
			
		_failed(res, error.message);
	});
})

router.get('/transfer/:model', function(req, res, next) {
    var AV = require('leanengine');
    var leanDAO = require('../platforms/leancloud/dao');
    
    leanDAO.findAll(req.params.model).then(function(objs){
		var promises = [];
        _.each(objs, function(o){
            var m = dao.new(req.params.model);
			m.set(o.attributes);
			promises.push(m.save());
        });
		
		Q.all(promises).then(function(){
			_succeed(res, "transfer " + req.params.model + " number is " + promises.length);
		}, function(error){
			_failed(res, error.message);
		});
    });
})

function _succeed(res, data) {
	data = data || {};
	res.status(200).send(data);
};

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send(error.message);
};

module.exports = router;