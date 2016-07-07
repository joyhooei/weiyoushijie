var express = require('express');
var router = express.Router();

var helper = require("./helper");
var Message = require("../models/message");

router.get('/multicast', function(req, res, next) {
	console.log("multicast " + JSON.stringify(req.query));
	
	if (!req.query.content){
		var usage = "<h1>使用帮助</h1>";
		usage += "<p>http://www.weiyoushijie.com/om/multicast?test=true&quantity=0&attach=none&content='消息内容'&limit=100&offset=0&vip=2</p>";
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
	filters.order = 'update_time DESC';
	
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
			if (req.query.test && req.query.test === 'false') {
				var p = Message.send(o.id, '系统公告', req.query.content, attach, quantity);
			} else {
				var p = Q.Promise(function(resolve, reject, notify) {resolve();});
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

module.exports = router;