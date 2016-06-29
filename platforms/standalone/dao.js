var mongoose = require( 'mongoose' );
		
function _value(m, attrName) {
	if (attrName == "objectId") {
		return m.id;
	} else {
		return m.get(attrName);
	}
};

function _bind(m, relations, k, v) {
	var r = _.filter(relations, function(relation) { return _value(relation, v.relationAttrName) == _value(m, v.attrName); });
	
	if (v.granularity == 1) {
		if (r.length > 0) {
			m[k] = r[0];
		}
	} else {
		m[k] = r;
	}
};

function _findRelation(m, k, v){
	return Q.Promise(
		function(resolve, reject, notify) {
			try {
				var query = new AV.Query(dao[v.relationClazName]);
				if (_.isArray(m)) {
					query.containedIn(v.relationAttrName, _.map(m, function(d){ return _value(d, v.attrName); }));
				} else {
					query.equalTo(v.relationAttrName, _value(m, v.attrName));
				}
				query.find().then(
					function(relations){
						if(_.isArray(m)) {
							_.each(m, function(d){
								_bind(d, relations, k, v)
							});
						} else {
							_bind(m, relations, k, v)
						}

						resolve(relations);
					}, function(err){
						console.error("_findRelation find " +　err.message);

						reject(err);
					});
			} catch (err) {
				console.error("_findRelation " +　err.message);

				reject(err);
			}					
		});
};

function _findRelations(claz, m, deep, deepest) {
	var promises = [];
	_.each(claz._relations, function(v, k){
		var promise = null;
		
		if (v.when) {
			try {
				var c = _.filter(m, function(obj){ return _.isMatch(obj.attributes, v.when); });
				if (c.length > 0) {
					promise = _findRelation(c, k, v);
				}
			} catch (err){
				console.error("_findRelations " +　err.message);
			}
		} else {
			promise = _findRelation(m, k, v);
		}
		
		if (promise) {
			if (deep < deepest) {
				var clazRelations = dao[v.relationClazName];
				var p = Q.Promise(function(resolve, reject, notify) {
							promise.then(function(relations){
								var pr = _findRelations(clazRelations, relations, deep + 1, deepest);
								if (pr) {
									pr.then(function(){
										resolve();
									}, function(error){
										reject(error);
									});
								} else {
									resolve();
								}
							});
						});
						
				promises.push(p);
			} else {
				promises.push(promise);
			}
		}
	});

	if (promises.length > 0) {
		return Q.all(promises);
	} else {
		return false;
	}
};

function _getModel(claz, id){
	return Q.Promise(
		function(resolve, reject, notify) {
			var query = new AV.Query(claz);
			query.get(id).then(
				function(model){
					var promise = _findRelations(claz, model, 1, 2);
					if (promise) {
						promise.fin(
							function(){
								resolve(model);
							});
					} else {
						resolve(model);
					}
				}, function(err) {
					console.error("_getModel get " +　err.message);

					reject(err);
				});
		});
};

function _findModels(claz, query){
	return Q.Promise(
		function(resolve, reject, notify) {
			query.find().then(
				function(model){
					var promise = _findRelations(claz, model, 1, 2);
					if (promise) {
						promise.fin(
							function(){
								resolve(model);
							});
					} else {
						resolve(model);
					}
				}, function(err) {
					console.error("_findModels find " +　err.message);

					reject(err);
				});
		});
};

var Model = function() {
};

Model.extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};

Model.hasOne = function(clazName) {
	var relationName = clazName.toLowerCase();
	this._relations[relationName] = {attrName: "objectId", relationClazName : clazName, relationAttrName: this._name.toLowerCase() + "_id", granularity: 1};

	return this;
};

Model.hasMany = function(clazName) {
	var relationName = clazName.toLowerCase() + "s";
	this._relations[relationName] = {attrName: "objectId", relationClazName : clazName, relationAttrName: this._name.toLowerCase() + "_id", granularity: 0};

	return this;
};

Model.belongsTo = function(clazName) {
	var relationName = clazName.toLowerCase();
	this._relations[relationName] = {attrName: relationName + "_id", relationClazName : clazName, relationAttrName: 'objectId', granularity: 1};

	return this;
};

Model.polymorphism = function(clazNames) {
	var self = this;

	_.each(clazNames, function(clazName){
		var relationName = clazName.toLowerCase();
		self._relations[relationName] = {attrName: 'entity_id', relationClazName : clazName, relationAttrName: 'objectId', granularity: 1, when:{entity_type: clazName}};
	});

	return self;
};

Model.prototype.decode = function(obj) {
	var self = this;
	
	try {
		self._obj = obj;

		self.id = self._obj.id;
		self.createdAt = self._obj.createdAt;
		self.updatedAt = self._obj.updatedAt;

		self.attributes = {};
		_.each(self._obj, function(v, k) {
			self.attributes[k] = v;
		});
	} catch (error) {
		console.error("decode obj failed " + JSON.stringify(obj));
	}
	
	return self;
}

Model.prototype.encode = function() {
	var self = this;
	
	try {
		_.each(self.attributes, function(v, k) {
			self._obj[k] = v;
		});
	} catch (error) {
		console.error("encode obj failed " + JSON.stringify(self));
	}
	
	return self._obj;
}

Model.prototype.get = function(attr) {
	return this.attributes[attr];
}

Model.prototype.set = function(attr, val) {
	if (_.isString(attr)) {
		this.attribute[attr] = val;
	} else if (_.isArray(attr)){
		this.attributes = _.extend(this.attributes, attr);
	}
}

Model.prototype.save = function() {
	var self = this;
	
	return Q.Promise(function(resolve, reject, notify) {
		self.encode().save(function(err, o){
			if (err) {
				reject(err);
			} else {
				resolve(self.decode());
			}
		});
	});
};

module.exports = function() {
	this.initialize = function(){
		var self = this;

		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log("connect mongodb succeed");

			self.addModel("Bid", {
				customer_id: String,
				day: String,
				gold: Number,
				succeed: Number,
				claimed: Number
			});
			self.addModel("Blacklist", {
				customer_id: String,
				reason: String
			});

			self.addModel("Customer", {
				uid: String,
				name: String,
				age: Number,
				sex: Number,
				avatar: String,
				
				metal: Number,
				gold: Number,
				earned_gold: Number,
				accumulated_gold: Number,
				diamond: Number,
				
				ticket: String,
				vip: Number,
				charge: Number,
				
				hide_winner: Number,
				
				offline_hours: Number,
				offline_minutes: Number,
				offline_gold: Number,
				online_seconds: Number,
				
				total_hits: Number,
				last_hit: String,
				
				last_login: String,
				
				output: Number,
			});

			self.addModel("Game", {
				version: String,
				code_url: String,
				update_url: String
			});
			self.addModel("Gift", {
				customer_id: String,
				category: Number,
				metal: Number,
				gold: Number,
				diamond: Number,
				locked: Number,
				data: String,
				last_pick_day: String
			});

			self.addModel("MaxBid", {
				customer_id: String,
				name: String,
				avatar: String,
				gold: Number,
				day: String
			});
			self.addModel("Message", {
				customer_id: String,
				title: String,
				content: String,
				attach_category: String,
				attach_quantity: Number,
				state: Number
			});

			self.addModel("Order", {
				customer_id: String,
				product: String,
				price: Number,
				state: Number,
				reason: String
			});

			self.addModel("Project", {
				customer_id: String,
				sequence: Number,
				level: Number,
				achieve: Number,
				tool_ratio: Number,
				unlocked: Number
			});

			self.addModel("Rank", {
				customer_id: String,
				rank: Number
			});
			self.addModel("Report", {
				customer_id: String,
				content: String,
				state: Number
			});		
		});
		
		mongoose.connect('mongodb://weiyoushijie:weiyugame@ds023644.mlab.com:23644/weiyoushijie');	
	};
	
	this.addModel = function(className, schema) {
		try {
			schema.game = String;
			var model = mongoose.model(className, new mongoose.Schema(schema, { timestamps: {} }));

			var claz = Model.extend(
			{
				constructor: function(){
					this.decode(new model());
				}
			},
			{
				class: model,		
				_name: className,
				_relations: {},
			});

			this[className] = claz;
			
			console.log("add model" + className + " succeed!");

			return claz;
		} catch (error) {
			console.error("add model" + className + " failed " + error.message);
			
			return null;
		}
	};
	
	this.get = function(className, id) {
		var self = this;
		
		return Q.Promise(function(resolve, reject, notify) {
			var clazz = self[className].class;
		
			clazz.findOne( {'_id' : id }, function(err, obj){
				if (err) {
					reject(err);
				} else {
					var m = new Model();
					resolve(m.decode(obj));
				}
			});
		});
	}
	
	this.findAll = function(className, conditions, filters) {
		return this.find(className, conditions. filters);
	}
	
	this.find = function(className, conditions, filters){
		var self = this;
		
		return Q.Promise(function(resolve, reject, notify) {
			var clazz = self[className].class;

			if (conditions) {
				var query = clazz.find(conditions);
			} else {
				var query = clazz.find();
			}

			if (filters) {
				if (filters.limit) {
					query.limit(filters.limit);
				} else {
					query.limit(1000);
				}

				if (filters.offset) {
					query.skip(filters.offset);
				} else {
					query.skip(0);
				}

				if (filters.order) {
					var sort = {};
					var orders = filters.order.split(",");
					for(var i = 0; i < orders.length; i++) {
						var kv = orders[i].trim().split(" ");
						if (kv.length == 2) {
							var k = kv[0].trim();
							var v = kv[1].trim();

							if (k ==  "create_time") {
								var name = "createdAt";
							} else if (k == "update_time") {
								var name = "updatedAt";
							} else {
								var name = k;
							}

							if (v.toUpperCase() == "ASC") {
								sort[name] = 1;
							} else {
								sort[name] = -1;
							}
						}
					}

					query.sort(sort);
				}
			}
		
			query.exec(function(err,objs){
				if (err) {
					reject(err);
				} else {
					var models = [];
					for (var i = 0; i < objs.length; i++) {
						var m = new Model();
						models.push(m.decode(objs[i]));
					}
					resolve(models);
				}
			});
		});
	};
	
	this.saveAll = function(objs) {
		var promises = [];
		
		for(var i = 0; i < objs.length; i++) {
			promises.push(objs[i].save());
		}
		
		return Q.all(promises);
	}
};
