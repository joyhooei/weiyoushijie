var express = require('express');
var router  = express.Router();

function _getChannel(req) {
	var channel = req.body.wysj_channel || req.query.wysj_channel || "egret";

	if (channel === "1758") {
		return require("../channels/channel_1758");
	} else if (channel === "huhuh5") {
		return require("../channels/channel_huhuh5");
	} else if (channel === "51h5") {
		return require("../channels/channel_51h5");
	} else {
		return require("../channels/channel_egret");
	}
}

router.post('/51h5_pay_url', function(req, res, next) {
	console.log("51h5_pay_url " + JSON.stringify(req.body));
	
	_getChannel(req).payUrl(req.body).then(function(data){
		_succeed(res, data);
	}, function(data){
		_failed(res, new Error(data));
	});
});
