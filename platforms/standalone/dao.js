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
			self.id = obj.id;
			self.createdAt = obj.createdAt;
			self.updatedAt = obj.updatedAt;

			self.attributes = {};
			self.set(obj);
			
			self._obj = obj;
		} catch (error) {
			console.error("decode obj failed " + error.message);
		}

		return self;
	},

	get:function(attr) {
		return this.attributes[attr];
	},

	set:function(key, val) {
		var self = this;
		
		try {
			if (typeof key === 'object') {
				_.each(self.getSchema(), function(v, k) {
					var d = key[k];
					if (!_.isUndefined(d)) {
						self.attributes[k] = d;
					}
				});
			} else {
				self.attributes[key] = val;
			}
		} catch (error) {
			console.error("set failed " + error.message);
		}
	},
	
	increment: function(attr, val) {
		this.set(attr, this.get(attr) + val);
	},
	
	destroy: function() {
		var self = this;

		return Q.Promise(function(resolve, reject, notify) {
			if (self._obj) {
				self._obj.remove(function(error){
					if (error) {
						reject(error);
					} else {
						resolve();
					}
				});
			} else {
				resolve();
			}
		});		
	},

	save: function() {
		var self = this;

		return Q.Promise(function(resolve, reject, notify) {
			try {
				_.each(self.getSchema(), function(v, k) {
					if (_.has(self.attributes, k)) {
						self._obj[k] = self.attributes[k];
					}
				});				
			
				if (self.isNew()) {
					self.beforeSave().then(function(){
						self._obj.save(function(error){
							if (error) {
								console.error("save obj " + JSON.stringify(self.attributes) + " failed " + error.message);
								
								reject(error);
							} else {
								try {
									self.afterSave();
								} catch (error) {
									console.error("afterSave obj " + JSON.stringify(self.attributes) + " failed " + error.message);
								}

								resolve(self.decode(self._obj).setNew(false));
							}
						});
					}, function(error){
						console.error("beforeSave obj " + JSON.stringify(self.attributes) + " failed " + error.message);
						reject(error);
					})
				} else {
					self._obj.save(function(error){
						if (error) {
							console.error("save obj " + JSON.stringify(self.attributes) + " failed " + error.message);
							reject(error);
						} else {
							resolve(self.decode(self._obj).setNew(false));
						}
					});	
				}
			} catch(error) {
				console.error("save model " + JSON.stringify(self.attributes) + " failed " + error.message);
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

function _query(query, offset, batch) {
	return Q.Promise(function(resolve, reject, notify) {
		query.skip(offset);
		query.limit(batch);
		query.exec(function(err, objs){
			if (err) {
				console.error("_query failed " + err.message);
				reject(err);
			} else {
				resolve(objs);
			}
		});
	});		
}

function _buildQuery(clazz, conditions, filters) {
	try {
		if (conditions) {
			if (conditions.id) {
				conditions._id = conditions.id;
				delete conditions.id;
			}

			_.each(conditions, function(v, k){
				if (_.isArray(v)) {

					conditions[k] = { $in: v };
				}
			})
			
			var query = clazz.find(conditions);
		} else {
			var query = clazz.find();
		}

		if (filters) {
			if (filters.limit) {
				query.limit(filters.limit);
			}

			if (filters.offset) {
				query.skip(filters.offset);
			} else {
				query.skip(0);
			}
			
			if (filters.select) {
				query.select(filters.select);
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

		return query;
	} catch (error) {
		console.error(error.message);
	}
}

module.exports = function() {
	this.initialize = function(app){
		var self = this;

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
				game: String
			}, {
				game: 1,
				customer_id: 1
			});
			
			self.addModel("Audit", {
				customer_id: String,
				operator: String,
				category: String,
				detail: String,
				result: {type: Number, default: 1},
				rewards: {type: Number, default: 0},
				claimed: {type: Number, default: 0},
				error: String,
				game: String
			});

			self.addModel("Bid", {
				customer_id: String,
				day: String,
				gold: Number,
				succeed: {type: Number, default: 0},
				claimed: {type: Number, default: 0},
				game: String
			}, {
				game: 1,
				day: 1,
				customer_id: 1
			});
			
			self.addModel("Blacklist", {
				customer_id: String,
				reason: {type: String, default: ""},
				game: String
			}, {
				game: 1,
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
				
				version: String,
				
				channel_data: String,

				game: String
			}, {
				game: 1,
				uid: 1
			});

			self.addModel("Game", {
				version: String,
				code_url: String,
				update_url: String,
				game: String
			});
			
			self.addModel("Gift", {
				customer_id: String,
				category: Number,
				metal: Number,
				gold: Number,
				diamond: Number,
				locked:  {type: Number, default: 1},
				data: String,
				last_pick_day: String,
				game: String
			}, {
				game: 1,
				customer_id: 1,
				category: 1
			});
			
			//英雄
			self.addModel("Legend", {
				customer_id: String,
				name: String,
				level:  {type: Number, default: 1},
				game: String
			}, {
				game: 1,
				customer_id: 1,
				name: 1
			});
			
			self.addModel("Log", {
				url: String,
				version: String,
				message: String,
				exception: String,
				layout: String,
				level: String,
				logger: String,
				timestamp: String,
				game: String
			});

			self.addModel("MaxBid", {
				customer_id: String,
				name: String,
				avatar: String,
				gold: Number,
				day: String,
				game: String
			}, {
				game: 1,
				day: 1
			});
			
			self.addModel("Message", {
				customer_id: String,
				title: String,
				content: String,
				attach_category:  {type: String, default: "none"},
				attach_quantity:  {type: Number, default: 0},
				state:  {type: Number, default: 0},
				game: String
			});
			
			self.addModel("Notification", {
				content: String,
				deadline: String,
				action:  {type: Number, default: 0},
				game: String
			});

			self.addModel("Order", {
				customer_id: String,
				product: String,
				price: Number,
				channel: String,
				state:  {type: Number, default: 0},
				reason: String,
				game: String
			});

			self.addModel("Project", {
				customer_id: String,
				sequence: Number,
				level: {type: Number, default: 1},
				achieve: {type: Number, default: 0},
				tool_ratio: {type: Number, default: 1},
				unlocked: {type: Number, default: 0},
				game: String
			}, {
				game: 1,
				customer_id: 1,
				sequence: 1
			});

			self.addModel("Rank", {
				customer_id: String,
				rank: Number,
				game: String
			});

			self.addModel("Report", {
				customer_id: String,
				content: String,
				state:  {type: Number, default: 0},
				game: String
			});
			
			//英雄技能
			self.addModel("Skill", {
				customer_id: String,
				legend_id: String,
				name: String,
				level:  {type: Number, default: 1},
				game: String
			}, {
				game: 1,
				legend_id: 1,
				name: 1
			});
			
			self.addModel("Star", {
				customer_id: String,
				opened_level: {type: Number, default: 0},
				opening_level:  {type: Number, default: 0},
				open_time: String,
				saving_hours: {type: Number, default: 0},
				last_pick_time: String,
				sticks: {type: Number, default: 0},
				game: String
			});			
			
			self.addModel("Tool", {
				customer_id: String,
				catetory: String,
				quantity: {type: Number, default: 0},
				game: String
			});

			require('./cloud');

			console.log("connect mongodb succeed " + url);
		});
		
		if (process.env.LC_APP_ID) {
			//leancloud
			var AV = require('leanengine');
			app.use(AV.Cloud);

			var url = 'mongodb://weiyoushijie:weiyugame@ds023644.mlab.com:23644/weiyoushijie';
		} else if (process.env.PORT) {
			//heroku or local
			var url = 'mongodb://weiyoushijie:weiyugame@ds023644.mlab.com:23644/weiyoushijie';
		} else {
			//bae
			var url = 'mongodb://9b18dc67c08b4434bdf68b0c3ff45477:d35f2aa56b1b4806b9934950c3d89bea@mongo.bce.duapp.com:8908/gmkSqUizKEatLnvxuIcZ';
		}

		mongoose.connect(url, {db: {w: 1}});
		
		var log4js = require('log4js');
		log4js.configure({
		    appenders: [
		        {
		            type: 'log4js-node-mongodb',
		            connectionString: url,
		            collectionName: 'backlogs',
		            category: [ 'larksoft', 'console' ]
		        },
		        /*
			    {
			      	type: "smtp",
			      	recipients: "weihailee@sohu.com",
			      	sendInterval: 5,
			      	transport: "SMTP",
			      	SMTP: {
			        	host: "smtp.sohu.com",
			        	port: 25,
			    		auth: {
			          		user: "weihailee@sohu.com",
			          		pass: "future"
			        	},
			        	debug: true
			      	},
			      	category: [ 'larksoft', 'console' ]
			    },
			    */
		        {
		            type: "console"
		        }
		    ],
		    replaceConsole: true
		});
		
		const session    = require('express-session');
		const MongoStore = require('connect-mongo')(session);
		app.use(session({
		    secret: 'supernova',
		    store: new MongoStore({ mongooseConnection: mongoose.connection }),
		    resave: true, 
		    saveUninitialized: true,
		    expires: new Date(Date.now() + (86400 * 1000))
		}));
	}
	
	this.addModel = function(className, schema, uniques) {
		var self = this;
		
		try {
			var ModelSchema = new mongoose.Schema(schema, { timestamps: {} });			
			if (uniques) {
				uniques.game = 1;
				ModelSchema.index(uniques, { unique: true })
			}

			var ModelClass = mongoose.model(className, ModelSchema);
			
			var claz = Model.extend(
			{
				initialize: function(attributes){
					var obj = new claz.class(attributes || {});
					this.decode(obj).setNew(true);
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

	this.decodeAll = function(className, objs, isNew) {
		var models = [];

		for (var i = 0; i < objs.length; i++) {
			models.push(this.decodeOne(className, objs[i], isNew));
		}
 
		return models;
	}
	
	this.decodeOne = function(className, obj, isNew) {
		return this.new(className).decode(obj).setNew(isNew);
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
					resolve(self.decodeOne(className, obj, false));
				}
			});
		});
	}
	
	this.count = function(className, conditions, filters) {
		var self = this;
		
		return Q.Promise(function(resolve, reject, notify) {
			var clazz = self[className].class;

			var query = _buildQuery(clazz, conditions, filters);
			query.count(function(error, total) {
				if (error) {
					console.error("findAll count failed " + error.message);
					reject(error);					
				} else {
					resolve(total);
				}
			});
		});
	}
	
	this.findAll = function(className, conditions, filters) {
		var self = this;
		
		return Q.Promise(function(resolve, reject, notify) {
			var clazz = self[className].class;

			var query = _buildQuery(clazz, conditions, filters);
			query.count(function(error, total) {
				if (error) {
					console.error("findAll count failed " + error.message);
					reject(error);					
				} else {
					var offset   = 0; 
					var batch    = 1000;
					var promises = [];
					while (offset < total) {
						var q = _buildQuery(clazz, conditions, filters);
						promises.push(_query(q, offset, batch));

						offset += batch;
					}

					if (promises.length > 0) {
						Q.all(promises).then(function(results){
							var objs = ([].concat.apply([], results));
							resolve(self.decodeAll(className, objs, false));
						}, function(error){
							console.error("findAll Q.all failed " + error.message);
							reject(error);
						});
					} else {
						resolve([]);
					}
				}
			});
		});
	}
	
	this.find = function(className, conditions, filters){
		var self = this;

		return Q.Promise(function(resolve, reject, notify) {
			var clazz = self[className].class;
			var query = _buildQuery(clazz, conditions, filters);
		
			query.exec(function(err, objs){
				try {
					if (err) {
						console.error("query exec failed " + err.message);
						reject(err);
					} else {
						resolve(self.decodeAll(className, objs, false));
					}
				} catch (err) {
					console.error("query unkonw error " + err.message);
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
	
	this.destroyAll = function(objs) {
		var promises = [];
		
		for(var i = 0; i < objs.length; i++) {
			promises.push(objs[i].destroy());
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
