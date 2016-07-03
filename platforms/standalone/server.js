'use strict';

if (process.env.LC_APP_ID) {
	var AV = require('leanengine');

	var APP_ID = process.env.LC_APP_ID;
	var APP_KEY = process.env.LC_APP_KEY;
	var MASTER_KEY = process.env.LC_APP_MASTER_KEY;

	AV.initialize('lcM4PuQxRsdVmalV8NbyE4If-gzGzoHsz', 'J3THSeE0XwaSqIQxCkezkvSD', 'bufePXDxXK6Cxck3SEjsIfOC');
	// 如果不希望使用 masterKey 权限，可以将下面一行删除
	AV.Cloud.useMasterKey();

	var port = parseInt(process.env.LC_APP_PORT || 3000);
} else {
	var port = 18080;
}

var app = require('./app');

// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
app.listen(port, function () {
  console.log('Node app is running, port:', port);
});
