var express = require('express');
var router = express.Router();
	
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
			conditions[k] = v;
		}
	});
    
	var filters = {};
	filters.limit  = parseInt(req.query.limit || 100);
	filters.offset = parseInt(req.query.offset || 0);
	
	var quantity = parseInt(req.query.quantity || 0);
	var attach = req.query.attach || "none";
	
	ldao.find('Customer', conditions, filters).then(function(objs){
		var promises = [];
		
		var html = "<h1>Multicast to: <h1>";
		html += "<table>";
        _.each(objs, function(o){
			html += "<tr>";
			
			if (req.query.test) {
				promises.push(Q.Promise(function(resolve, reject, notify) {
					resolve();
				}));
			} else {
				var Message = require('../models/message');

				promises.push(Message.send(o.id, '系统公告', req.query.content, attach, quantity));
			}
			
			html += "<td>" + o.get("name") + "</td>" + "<td>" + o.id + "</td>" + "<td>" + o.get("charge") + "</td>";
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
    ldao.findAll(req.params.model).then(function(objs){
		var promises = [];
        _.each(objs, function(o){
            var m = dao.new(req.params.model);
			m.set(o.attributes);
			promises.push(m.save());
        });
		
		Q.all(promises).then(function(){
			_succeed(res, "transfer " + req.params.model + " number is " + promises.length);
		}, function(error){
			_failed(res, error);
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