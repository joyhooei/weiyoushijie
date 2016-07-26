var fs = require('fs');
var crypto = require('crypto');
var multer  = require('multer');

module.exports.getChannel = function(req) {
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
};

module.exports.decode = function(obj) {
	try {
		var attributes = _.extend({"id" : obj.id}, _.omit(obj.attributes, ["ACL", "location"]));
		var model = attributes;

		model.create_time = moment(obj.createdAt).format("YYYY-MM-DD HH:mm:ss");
		model.update_time = moment(obj.updatedAt).format("YYYY-MM-DD HH:mm:ss");

		return model;
	} catch(error) {
		console.error("_decode failed " + error.message);
	}
};

module.exports.encode = function(model, attrs) {
	var attributes = _.clone(attrs);

	delete attributes.create_time;
	delete attributes.update_time;

	model.set(attributes);
	return model;
};

module.exports.do = function(promise, res) {
	promise.then(function(result){
		_succeed(res, result);
	}, function(error){
		_failed(res, error);
	});
};

function _succeed(res, data) {
	data = data || {};
	if (_.isNumber(data)) {
		data = data.toString();
	}
	res.status(200).send(data);
}

function _failed(res, error, status) {
	status = status || 500;
	res.status(status).send(error.message);
}

module.exports.succeed = function(res, data) {
	_succeed(res, data);
};

module.exports.failed = function(res, error, status) {
	_failed(res, error, status);
};

module.exports.redirect = function (restfulName, req, res) {
	_redirect(restfulName, req, res);
};

module.exports.render = function (view, req, res, options) {
	_render(view, req, res, options);
};

function _redirect(restfulName, req, res) {
	var paras = [];
	_.each(req.query, function(value, key){
		paras.push(key + "=" + value);
	});
	
	if (paras.length > 0) {
		res.redirect('/' + restfulName + '?' + paras.join("&"));
	} else {
		res.redirect('/' + restfulName);
	}
}

function _render(view, req, res, options) {
	if (options) {
		_.extend(options, req.query);
	} else {
		options = req.query;
	}
	
	res.render(view, options);
}

function _renderIndex(model, modelName, restfulName, req, res) {
	var options = {};
	options[modelName] = model;
	_render(restfulName + '/index', req, res, options);
}

function _renderView(model, modelName, restfulName, req, res) {
	var options = model.attributes;
	options[modelName] = model;
	_render(restfulName + '/view', req, res, options);
}

function _renderEdit(model, modelName, restfulName,  req, res, options) {
	if (options) {
		_.extend(options, model.attributes);
	} else {
		options = model.attributes;
	}
	
	options[modelName] = model;
	_render(restfulName + '/edit', req, res, options);
}

function _queryModel(query, modelName, restfulName, req, res){
	query.then(function(models){
		_renderIndex(models, modelName, restfulName, req, res);
	}, function(err){
		req.flash('errors', { msg: err.message });

		_renderIndex([], modelName, restfulName, req, res);
	});	
}

module.exports.queryModel = function(query, modelName, restfulName, req, res){
	_queryModel(query, modelName, restfulName, req, res);
};

module.exports.listModel = function(modelClass, modelName, restfulName, req, res){
	var query = dao.find(modelClass, {game: req.query.game}, {order: 'update_time DESC'});
	_queryModel(query, modelName, restfulName, req, res);
};

module.exports.viewModel = function(modelClass, modelName, restfulName, req, res){
	dao.get(modelClass, req.params.id).then(
		function(model){
			_renderView(model, modelName, restfulName, req, res);
		}, function(err){
			req.flash('errors', { msg: err.message });

			_redirect(restfulName, req, res);
		});
};

module.exports.newModel = function(model, modelName, restfulName, req, res, options){
	_renderEdit(model, modelName, restfulName, req, res, options);
};

module.exports.editModel = function(modelClass, modelName, restfulName, req, res, options){
	dao.get(modelClass, req.params.id).then(
		function(model){
			_renderEdit(model, modelName, restfulName, req, res, options);
		}, function(err){
			req.flash('errors', { msg: err.message });

			_redirect(restfulName, req, res);	
		});
};

function _saveModel(model, modelName, restfulName, req, res, options) {
	_.each(model.attributes, function(value, key) {
		if (_.isNumber(value)) {
			if (_.has(req.body, key)) {
				model.set(key, parseInt(req.body[key]));
			}
		} else if (_.isString(value)) {
			if (_.has(req.body, key)) {
				model.set(key, req.body[key]);
			} else {
				if (key.indexOf("_id") == -1){
					model.set(key, "");
				}
			}
		} else {
			console.error(modelName + " " + key + " has unused data type " + value);
		}
	});

	//防止req.body中有model中不存在的字段
	_.each(req.body, function(value, key){
		if (_.has(model.attributes, key) && _.isNumber(model.get(key))) {
			model.set(key, parseInt(value));
		} else {
			model.set(key, value);
		}
	});

	model.set("game", req.query.game);
	model.save().then(function(m) {
		_redirect(restfulName, req, res);
	}, function(err){
		req.flash('errors', { msg: err.message });

		_renderEdit(model, modelName, restfulName, req, res, options);
	});
}

module.exports.createModel = function(model, modelName, restfulName, req, res, options){
	_saveModel(model, modelName, restfulName, req, res, options);
};

module.exports.updateModel = function(modelClass, modelName, restfulName, req, res, options){
	dao.get(modelClass, req.params.id).then(
		function(model){
			_saveModel(model, modelName, restfulName, req, res, options);
		}, function(err){
			req.flash('errors', { msg: err.message });

			_redirect(restfulName, req, res);
		});	
};

module.exports.deleteModel = function(modelClass, restfulName, flash, req, res){
	dao.get(modelClass, req.params.id).then(
		function(model){
			model.destroy().then(
				function(c){
					req.flash('success', { msg: flash });

					_redirect(restfulName, req, res);
				}, function(err){
					req.flash('errors', { msg: err.message });

					_redirect(restfulName, req, res);
				});
		}, function(err){
			req.flash('errors', { msg: err.message });

			_redirect(restfulName, req, res);
		});
};

module.exports.ensureAuthenticated = function (req, res, next) {
   	if (req.isAuthenticated()) { 
		  return next(); 
	}

  	res.redirect('/login');
};

module.exports.upload = function (req, res, next) {
	var storage = multer.diskStorage({
		filename: function (req, file, cb) {
			cb(null, Date.now() + "-" + file.originalname)
	  	}
	});
	
	return multer({ storage: storage }).any();
};

module.exports.md5 = function (str) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
};
