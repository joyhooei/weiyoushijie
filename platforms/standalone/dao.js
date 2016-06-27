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

module.exports = function() {
	this.initialize = function(){
		var mongoose = require( 'mongoose' );
		
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			this.addModel("Bid", {
				customer_id: String,
				day: String,
				gold: Number,
				succeed: Number,
				claimed: Number
			});
			this.addModel("Blacklist", {
				customer_id: String,
				reason: String
			});

			this.addModel("Customer", {
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

			this.addModel("Game", {
				version: String,
				code_url: String,
				update_url: String
			});
			this.addModel("Gift", {
				customer_id: String,
				category: Number,
				metal: Number,
				gold: Number,
				diamond: Number,
				locked: Number,
				data: String,
				last_pick_day: String
			});

			this.addModel("MaxBid", {
				customer_id: String,
				name: String,
				avatar: String,
				gold: Number,
				day: String
			});
			this.addModel("Message", {
				customer_id: String,
				title: String,
				content: String,
				attach_category: String,
				attach_quantity: Number,
				state: Number
			});

			this.addModel("Order", {
				customer_id: String,
				product: String,
				price: Number,
				state: Number,
				reason: String
			});

			this.addModel("Project", {
				customer_id: String,
				sequence: Number,
				level: Number,
				achieve: Number,
				tool_ratio: Number,
				unlocked: Number
			});

			this.addModel("Rank", {
				customer_id: String,
				rank: Number
			});
			this.addModel("Report", {
				customer_id: String,
				content: String,
				state: Number
			});		
		});
		
		mongoose.connect('mongodb://localhost/weiyu');	
	};
	
	this.addModel = function(className, schema) {
		schema.game = String;
		
		var claz = mongoose.model(className, new mongoose.Schema(schema, { timestamps: {} }));
		
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
};
