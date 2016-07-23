var fs = require('fs');
var crypto = require('crypto');
var multer  = require('multer');

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
