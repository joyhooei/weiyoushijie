var express = require('express');
var router = express.Router();
var request = require('request');

var Message = require('../models/message');
	
router.get('/multicast', function(req, res, next) {
	console.log("multicast " + JSON.stringify(req.query));
	
	if (!req.query.content){
		var usage = "<h1>使用帮助</h1>";
		usage += "<p>http://stg-weiyugame.leanapp.cn/om/multicast?test=true&quantity=0&attach=none&content='消息内容'&limit=100&offset=0&vip=2</p>";
		usage += "<p>test=true：表示不发送，只是看一下哪些玩家会被发送消息</p>";
		usage += "<p>attach=none&content='消息内容'：消息Message表中的内容和附件</p>";
		usage += "<p>limit=100&offset=0：从第几个玩家开始，最多多少玩家</p>";
		usage += "<p>vip=2：指定查询玩家的条件，可以指定Customer表中的字段</p>";
	
		_failed(res, new Error("<p>没有内容参数</>" + usage));
		
		return;
	}
	
	var conditions = {};
	_.each(req.query, function(v, k) {
		if (k != "content" && k != "attach" && k != "quantity" && k != "test"){
			if (!isNaN(v)) {
				conditions[k] = +v;
			} else {
				conditions[k] = v;
			}
		}
	});
    
	var filters = {};
	filters.limit  = parseInt(req.query.limit || 100);
	filters.offset = parseInt(req.query.offset || 0);
	
	var quantity = parseInt(req.query.quantity || 0);
	var attach = req.query.attach || "none";
	
	dao.find('Customer', conditions, filters).then(function(objs){
		var promises = [];
		
		var html = "<p>消息内容：" + req.query.content + "</p>";
		html += "<p>消息附件：" + attach + "</p>";
		html += "<p>附件数量：" + quantity + "</p>";
		html += "<table border='1'>";
		var first = true;
        _.each(objs, function(o){
			if (req.query.test) {
				var p = Q.Promise(function(resolve, reject, notify) {
							resolve();
						});
			} else {
				var p = Message.send(o.id, '系统公告', req.query.content, attach, quantity);
			}
			promises.push(p);
			
			if (first) {
				html += "<tr>";			
				_.each(o.attributes, function(v, k) {
					html += "<th>" + k + "</th>";
				});
				html += "</tr>";
				
				first = false;
			}
			
			html += "<tr>";
			_.each(o.attributes, function(v, k) {
				html += "<td>" + v + "</td>";
			});
			html += "</tr>";
        });
		html += "</table>";
		
		Q.all(promises).then(function(){
			res.status(200).send(html);
		}, function(error){
			console.error("send message failed " + error.message);			
			_failed(res, error);
		});	
	}, function(error){
		console.error("find customer failed " + error.message);			
		_failed(res, error);
	});
})

router.get('/clear/:model', function(req, res, next) {
	dao.clear(req.params.model).then(function(p){
		_succeed(res, "clear " + req.params.model + " number is " + p);
	}, function(error){
		console.error(error.message);			
		_failed(res, error);
	});
})

router.get('/transfer/:model', function(req, res, next) {
	var offset = parseInt(req.query.offset || 0);
	var total  = parseInt(req.query.limit  || 1000);
	dao.clear(req.params.model).then(function(p){
		_query(req, res,  total,
			"http://weiyugame.leanapp.cn/api/select/" + req.params.model, 
			{conditions: {game: "headline"}, filters: {limit: 100, offset: offset, order: 'create_time ASC'}});
	});
})

function _post(url, data) {
	return Q.Promise(function(resolve, reject, notify) { 
		var options = {
		    url: url,
		    method: 'POST',
		    json:true,
		    body: data
		};

		function callback(error, response, data) {
		    if (!error && response.statusCode == 200) {
		        resolve(data);
		    } else {
		    	reject(new Error(response.statusCode));
		    }
		}

		request(options, callback);
	});	
}

function _query(req, res, total, url, data) {
	console.log("_query " + JSON.stringify(data));

	var promise = Q.Promise(function(resolve, reject, notify) {
		_post(url, data).then(function(body){
			try {
				var promises = [];

				_.each(body, function(obj){
					var m = dao.new(req.params.model);
					m.set(obj);

					promises.push(m.save());
				});

				if (promises.length > 0) {
					Q.all(promises).then(function(){
						console.log("Transferred " + req.params.model + " size is " + promises.length);
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
	
	promise.then(function(length){
		data.filters.offset += length;
		if (data.filters.offset < total && length > 0) {
			_query(req, res, total, url, data);
		} else {
			res.status(200).send("Transfer " + req.params.model + " " + total + " succeed!");
		}
	}, function(error){
		console.error(error.message);			
		_failed(res, error);
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