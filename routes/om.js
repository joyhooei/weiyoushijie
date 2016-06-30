var express = require('express');
var router = express.Router();

router.get('/clear/:model', function(req, res, next) {
	dao.clear(req.params.model).then(function(p){
		res.status(200).send("clear " + req.params.model + " number is " + p);
	}, function(error){
		console.error(error.message);
			
		res.status(500).send(error.message);	
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
			res.status(200).send("transfer " + req.params.model + " number is " + promises.length);
		}, function(error){
			console.error(error.message);
			
			res.status(500).send(error.message);
		});
    });
})

module.exports = router;