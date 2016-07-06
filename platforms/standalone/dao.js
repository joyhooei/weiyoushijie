var mongoose = require( 'mongoose' );

var Model = function(attributes) {
	this.initialize.apply(this, arguments);
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
}

_.extend(Model.prototype, {
	_isNew: true,
	
	initialize:function(){
		this.setNew(true);
	},
	
	setNew: function(isNew){
		this._isNew = isNew;
		
		return this;
	},
	
	isNew: function() {
		return this._isNew;
	},

	decode:function(obj) {
		var self = this;

		try {
			self._obj = obj;

			self.id = self._obj.id;
			self.createdAt = self._obj.createdAt;
			self.updatedAt = self._obj.updatedAt;

			self.attributes = {};
			_.each(self.getSchema(), function(v, k) {
				self.attributes[k] = self._obj[k];
			});
		} catch (error) {
			console.error("decode obj failed " + error.message);
		}

		return self;
	},

	encode: function() {
		var self = this;

		try {
			_.each(self.attributes, function(v, k) {
				self._obj[k] = v;
			});
		} catch (error) {
			console.error("encode obj failed " + error.message);
		}

		return self._obj;
	},

	get:function(attr) {
		return this.attributes[attr];
	},

	set:function(key, val) {
		var self = this;

		try {
			if (typeof key === 'object') {
				_.extend(self.attributes, key);
				if (key.id) {
					self._obj._id = key.id;
					
					self.setNew(false);
				}
			} else {
				self.attributes[key] = val;
			}

			self.decode(self.encode());
		} catch (error) {
			console.error("set failed " + error.message);
		}
	},
	
	increment: function(attr, val) {
		this.set(attr, this.get(attr) + val);
	},

	save: function() {
		var self = this;

		return Q.Promise(function(resolve, reject, notify) {
			try {
				if (self.isNew()) {
					self.beforeSave().then(function(){
						self._obj.save(function(error){
							if (error) {
								console.error("save obj failed " + error.message);
								
								reject(error);
							} else {
								try {
									self.afterSave();
								} catch (error) {
									console.error("afterSave obj failed " + error.message);
								}

								resolve(self.decode(self._obj).setNew(false));
							}
						});
					}, function(error){
						console.error("beforeSave obj failed " + error.message);
						reject(error);
					})
				} else {
					self._obj.save(function(error){
						if (error) {
							console.error("save obj failed " + error.message);
							reject(error);
						} else {
							resolve(self.decode(self._obj).setNew(false));
						}
					});	
				}

			} catch(error) {
				console.error("save model failed " + error.message);
				reject(error);
			}
		});
	},

	//创建对象前调用
	beforeSave: function() {
		return Q.Promise(function(resolve, reject, notify) {
			resolve();
		});
	},

	//创建对象后调用
	afterSave: function() {
	},
});

module.exports = function() {
	this.initialize = function(app){
		var self = this;

		//mongoose.set('debug', true);
		
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			self.addModel("Account", {
				username: {type: String, default: ""},
				password: {type: String, default: ""},
				salt: {type: String, default: ""},
				token: {type: String, default: ""},
				role: {type: Number, default: 1},
				customer_id: String,
			}, {
				customer_id: 1
			});

			self.addModel("Bid", {
				customer_id: String,
				day: String,
				gold: Number,
				succeed: {type: Number, default: 0},
				claimed: {type: Number, default: 0}
			}, {
				day: 1,
				customer_id: 1
			});
			
			self.addModel("Blacklist", {
				customer_id: String,
				reason: {type: String, default: ""},
			}, {
				customer_id: 1
			});

			self.addModel("Customer", {
				uid: String,
				name: String,
				age: Number,
				sex: Number,
				avatar: {type: String, default: ""},
				
				metal: {type: Number, default: 0},
				gold: {type: Number, default: 0},
				earned_gold: {type: Number, default: 0},
				accumulated_gold: {type: Number, default: 0},
				diamond: {type: Number, default: 0},
				
				ticket: String,
				vip: {type: Number, default: 0},
				charge: {type: Number, default: 0},
				
				hide_winner: {type: Number, default: 0},
				
				offline_hours: {type: Number, default: 0},
				offline_minutes: {type: Number, default: 0},
				offline_gold: {type: Number, default: 0},
				online_seconds: {type: Number, default: 0},
				
				total_hits: {type: Number, default: 3},
				last_hit: String,
				
				last_login: String,
				
				output: {type: Number, default: 1},
			}, {
				uid: 1
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
				locked:  {type: Number, default: 1},
				data: String,
				last_pick_day: String
			}, {
				customer_id: 1,
				category: 1
			});

			self.addModel("MaxBid", {
				customer_id: String,
				name: String,
				avatar: String,
				gold: Number,
				day: String
			}, {
				day: 1
			});
			
			self.addModel("Message", {
				customer_id: String,
				title: String,
				content: String,
				attach_category:  {type: String, default: "none"},
				attach_quantity:  {type: Number, default: 0},
				state:  {type: Number, default: 0}
			});

			self.addModel("Order", {
				customer_id: String,
				product: String,
				price: Number,
				state:  {type: Number, default: 0},
				reason: String
			});

			self.addModel("Project", {
				customer_id: String,
				sequence: Number,
				level: {type: Number, default: 1},
				achieve: {type: Number, default: 0},
				tool_ratio: {type: Number, default: 1},
				unlocked: {type: Number, default: 0}
			}, {
				customer_id: 1,
				sequence: 1
			});

			self.addModel("Rank", {
				customer_id: String,
				rank: Number
			});
			self.addModel("Report", {
				customer_id: String,
				content: String,
				state:  {type: Number, default: 0}
			});

			require('./cloud');

			console.log("connect mongodb succeed");
		});
		
		if (process.env.LC_APP_ID) {
			var AV = require('leanengine');
			app.use(AV.Cloud);
			
			mongoose.connect('mongodb://weiyoushijie:weiyugame@ds023644.mlab.com:23644/weiyoushijie');
		} else {
			mongoose.connect('mongodb://9b18dc67c08b4434bdf68b0c3ff45477:d35f2aa56b1b4806b9934950c3d89bea@mongo.bce.duapp.com:8908/gmkSqUizKEatLnvxuIcZ', {db: {w: 1}})
		}
	}
	
	this.addModel = function(className, schema, uniques) {
		try {
			schema.game = String;				
			
			var ModelSchema = new mongoose.Schema(schema, { timestamps: {} });			
			if (uniques) {
				uniques.game = 1;
				ModelSchema.index(uniques, { unique: true })
			}
			
			var ModelClass = mongoose.model(className, ModelSchema);
			
			var claz = Model.extend(
			{
				initialize: function(attributes){
					this.decode(new claz.class(attributes || {}));
				},

				getClass: function(){
					return claz.class;
				},

				getSchema: function(){
					return claz.schema;
				}
			},
			{
				class: ModelClass,
				schema: schema
			});

			this[className] = claz;

			console.log("add model " + className);

			return claz;
		} catch (error) {
			console.error("add model " + className + " failed " + error.message);
			
			return null;
		}
	};

	this.beforeSave = function(className, cb) {
		var claz = this[className];

		claz.prototype.beforeSave = function(){
			return cb(this);
		};
	}

	this.afterSave = function(className, cb) {
		var claz = this[className];

		claz.prototype.afterSave = function(){
			cb(this);
		};
	}
	
	this.new = function(className) {
		var clazz = this[className];
		return new clazz();
	}
	
	this.get = function(className, id) {
		var self = this;
		
		return Q.Promise(function(resolve, reject, notify) {
			var clazz = self[className];
		
			clazz.class.findById(id, function(err, obj){
				if (err) {
					console.error("findById " + id + " failed " + err.message);
					reject(err);
				} else {
					resolve(self.new(className).decode(obj).setNew(false));
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
				if (conditions.id) {
					conditions._id = conditions.id;
					delete conditions.id;
				}
				
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
		
			query.exec(function(err, objs){
				try {
					if (err) {
						reject(err);
					} else {
						var models = [];

						for (var i = 0; i < objs.length; i++) {
							models.push(self.new(className).decode(objs[i]).setNew(false));
						}

						resolve(models);
					}
				} catch (err) {
					console.error("query " + err.message);
					reject(err);
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
	};
	
	this.clear = function(className) {
		var claz = this[className];
		
		return Q.Promise(function(resolve, reject, notify) {
			claz.class.remove(function(err, p){
				if(err){ 
					reject(err);
				} else{
					resolve(p);
				}
			});
		});
	}

};
