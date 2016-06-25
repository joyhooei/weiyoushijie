module.exports = function() {
	this.initialize = function(){
		this.addModel("Bid");
		this.addModel("Blacklist");

		this.addModel("Compensation");
		this.addModel("Customer");
		
		this.addModel("Game");
		this.addModel("Gift");
		
		this.addModel("MaxBid");
		
		this.addModel("Order");
		
		this.addModel("Project");
		
		this.addModel("Rank");
		this.addModel("Report");
	};
	
	this.addModel = function(className) {
		var claz = {};
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