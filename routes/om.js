var express = require('express');
var router = express.Router();
var Helper = require('../channels/helper');

router.get('/transfer_all', function(req, res, next) {
	var modelNames = ['Bid', 'MaxBid', 'Blacklist', 'Customer', 'Message', 'Gift', 'Report', 'Project', 'Game', 'Order'];
	
	var promises = [];
	for (var i = 0; i < modelNames.length; i++) {
		promises.push(_transfer(modelNames[i]));
	}
	
	Q.all(promises).then(function(results){
		_succeed(res, "Transfer all succeed! " + JSON.stringify(results));
	}, function(error){
		_failed(res, error);
	});
})

router.get('/transfer/:model', function(req, res, next) {
	var modelName = req.params.model;
	_transfer(modelName).then(function(actualTotal){
		_succeed(res, "Transfer " + modelName + " " + actualTotal + " succeed!");
	}, function(error){
		_failed(res, error);
	});
})

function _transfer(modelName) {
	var url = "http://weiyugame.leanapp.cn/api/select/" + modelName;
	return Q.Promise(function(resolve, reject, notify) { 
		dao.clear(modelName).then(function(p){
			_queryTotal(modelName, 100000, url, {conditions: {}, filters: {limit: 100, offset: 0, order: 'update_time DESC'}}, resolve, reject);
		}, function(error){
			console.error("clear " + modelName + " failed " + error.message);
			reject(error);
		});
	});
}

function _queryOneBulk(modelName, url, data) {
	return Q.Promise(function(resolve, reject, notify) {
		Helper.post(url, data).then(function(body){
			try {
				var promises = [];

				_.each(body, function(obj){
					var m = dao.new(modelName);
					m.set(obj);

					promises.push(m.save());
				});

				if (promises.length > 0) {
					Q.all(promises).then(function(){
						resolve(promises.length);
					}, function(error){
						console.error("Transfer failed when save objs " + error.message);
						reject(error);
					});
				} else {
					resolve(0);
				}
			} catch (error) {
				console.error("Transfer failed " + error.message);
				reject(error);
			}
		}, function(error){
			console.error("Post " + url + " with " + JSON.stringify(data) + " failed " + error.message);
			reject(error);
		});
	});
}

function _queryTotal(modelName, total, url, data, resolve, reject) {
	console.log("_queryTotal " + JSON.stringify(data));

	_queryOneBulk(modelName, url, data).then(function(length){
		data.filters.offset += length;
		
		if (data.filters.offset < total && length > 0 && length == data.filters.limit) {
			_queryTotal(modelName, total, url, data, resolve, reject);
		} else {
			resolve(data.filters.offset);
		}
	}, function(error){		
		reject(error);
	});
}

function _succeed(res, data) {
	data = data || {};
	res.status(200).send(data);
};

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send(error.message);
};

module.exports = router;