var request = require('request');
var AV = require('leanengine');

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

function _query(query, offset, total) {
	return Q.Promise(function(resolve, reject, notify) {
		query.skip(offset);
		query.limit(1000);
		query.find().then(function(models){
			resolve(models);
		}, function(error){
			console.error("findAll find " + error.message);
			reject(error);
		});
	});		
}

function _buildQuery(className, conditions, filters) {
	var query = new AV.Query(dao[className]);

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
			var orders = order.split(",");
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
						query.addAscending(name);
					} else {
						query.addDescending(name);
					}
				}
			}
		}
		
		if (filters.select) {
			query.select(filters.select);
		}
	}

	if (conditions) {
		_.each(_.keys(conditions), function(key){
			var value = conditions[key];

			if (key == 'id') {
				key = 'objectId';
			}

			if (_.isArray(value)) {
				query.containedIn(key, value);
			} else if (_.isObject(value)) {
				_.each(value, function(v, k){
					if (k == "matches"){
						query.matches(key, v, "-i");
					} else {
						query[k](key, v);
					}
				});
			} else {
				query.equalTo(key, value);
			}
		})
	}

	return query;
}

module.exports = function() {
	this.initialize = function(){
		this.addModel("Bid");
		this.addModel("Blacklist");

		this.addModel("Customer");
		
		this.addModel("Game");
		this.addModel("Gift");
		
		this.addModel("MaxBid");
		this.addModel("Message");
		
		this.addModel("Order");
		
		this.addModel("Project");
		
		this.addModel("Rank");
		this.addModel("Report");
	};
	
	this.addModel = function(className) {
		var claz = AV.Object.extend(className);
		claz._name = className;
		claz._relations = {};
		
		claz.get = function(id) {
			return _getModel(this, id);
		};
		
		claz.find = function(query) {
			return _findModels(this, query);
		};
		
		claz.hasOne = function(clazName) {
			var relationName = clazName.toLowerCase();
			this._relations[relationName] = {attrName: "objectId", relationClazName : clazName, relationAttrName: this._name.toLowerCase() + "_id", granularity: 1};
			
			return this;
		};
		
		claz.hasMany = function(clazName) {
			var relationName = clazName.toLowerCase() + "s";
			this._relations[relationName] = {attrName: "objectId", relationClazName : clazName, relationAttrName: this._name.toLowerCase() + "_id", granularity: 0};
			
			return this;
		};
		
		claz.belongsTo = function(clazName) {
			var relationName = clazName.toLowerCase();
			this._relations[relationName] = {attrName: relationName + "_id", relationClazName : clazName, relationAttrName: 'objectId', granularity: 1};
			
			return this;
		};
		
		claz.polymorphism = function(clazNames) {
			var self = this;
			
			_.each(clazNames, function(clazName){
				var relationName = clazName.toLowerCase();
				self._relations[relationName] = {attrName: 'entity_id', relationClazName : clazName, relationAttrName: 'objectId', granularity: 1, when:{entity_type: clazName}};
			});
			
			return self;
		};
		
		this[className] = claz;
		return claz;
	};
	
	this.get = function(className, id) {
    	var query = new AV.Query(dao[className]);
		return query.get(id);
	}
	
	this.findAll = function(className, conditions, filters) {
		return Q.Promise(function(resolve, reject, notify) {
			var query = _buildQuery(className, conditions, filters);
			query.count().then(function(total) {
				var offset  = 0; 
				var promises = [];
				while (offset < total) {
					promises.push(_query(query, offset, total));

					offset += 1000;
				}

				if (promises.length > 0) {
					Q.all(promises).then(function(results){
						resolve([].concat.apply([], results));
					}, function(error){
						console.error("Helper Q.all " + error.message);
						reject(error);
					});
				} else {
					resolve([]);
				}
			}, function(error){
				console.error("Helper findAll count " + error.message);
				reject(error);
			});
		});
	}
	
	this.find = function(className, conditions, filters) {
		return _buildQuery(className, conditions, filters).find();
	}
	
	this.saveAll = function(objs) {
		return AV.Object.saveAll(objs);
	}
};
