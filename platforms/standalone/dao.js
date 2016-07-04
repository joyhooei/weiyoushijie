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
	initialize:function(){},

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
				if (self._obj.isNew) {
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

								resolve(self.decode(self._obj));
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
							resolve(self.decode(self._obj));
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
	this.initialize = function(){
		var self = this;

		//mongoose.set('debug', true);
		
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			self.addModel("Account", {
				username: String,
				password: String,
				salt: String,
				token: String,
				role: Number,
				customer_id: String,
			});

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

			require('./cloud');

			console.log("connect mongodb succeed");
		});
		
		//mongoose.connect('mongodb://weiyoushijie:weiyugame@ds023644.mlab.com:23644/weiyoushijie');	
		mongoose.connect('mongodb://221d9f35214c3bc7e42b8dc1e2738566:0566fbb81ffe13cac56acf420214522e@mongo.duapp.com:8908/NZusBhjryHfltelpWkiL')
	}
	
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
	
	this.addModel = function(className, schema) {
		try {
			schema.game = String;
			var M = mongoose.model(className, new mongoose.Schema(schema, { timestamps: {} }));
			
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
				class: M,
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
					var m = self.new(className).decode(obj);
					console.log("findById " + id + " " + JSON.stringify(m));
					resolve(m);
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
		
			query.exec(function(err, objs){
				try {
					if (err) {
						reject(err);
					} else {
						var models = [];

						for (var i = 0; i < objs.length; i++) {
							models.push(self.new(className).decode(objs[i]));
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
	}
};
