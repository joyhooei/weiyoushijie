var AV = require('leanengine');
var Cloud = require('./cloud');

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

function _buildQuery(query, conditions, filters) {
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
	this.initialize = function(app){
		app.use(Cloud);
		//app.use(AV.Cloud);
		
		var session = require('express-session');
		app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
		
		this.addModel("Account");
		
		this.addModel("Bid");
		this.addModel("Blacklist");

		this.addModel("Customer");
		
		this.addModel("Game");
		this.addModel("Gift");
		
		this.addModel("MaxBid");
		this.addModel("Message");
		
		this.addModel("Notification");
		
		this.addModel("Order");
		
		this.addModel("Project");
		
		this.addModel("Rank");
		this.addModel("Report");
		
		console.log("leancloud model created");
	};
	
	this.addModel = function(className) {
		var claz = AV.Object.extend(className);
		this[className] = claz;
		return claz;
	};
	
	this.get = function(className, id) {
    	var query = new AV.Query(this[className]);
		return query.get(id);
	}
	
	this.findAll = function(className, conditions, filters) {
		var query = new AV.Query(this[className]);
		return Q.Promise(function(resolve, reject, notify) {
			 _buildQuery(query, conditions, filters);
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
						console.error("findAll Q.all " + error.message);
						reject(error);
					});
				} else {
					resolve([]);
				}
			}, function(error){
				console.error("findAll count " + error.message);
				reject(error);
			});
		});
	}
	
	this.find = function(className, conditions, filters) {
		var query = new AV.Query(this[className]);
		return _buildQuery(query, conditions, filters).find();
	}
	
	this.saveAll = function(objs) {
		return AV.Object.saveAll(objs);
	}
	
	this.destroyAll = function(objs) {
		return AV.Object.destroyAll(objs);
	}	
};
