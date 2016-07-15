module.exports.expire = function() {
	return Q.Promise(function(resolve, reject, notify) {
	    var now = moment();
	    
	    dao.find("Notification", {}, {order: 'deadline ASC'}).then(function(notifications){
	        var expires = [];
	        
	        _.each(notifications, function(notification){
	            if (moment(new Date(notification.get('deadline'))) < now) {
	                expires.push(notification);
	            }
	        });
	        
	        if (expires.length > 0) {
				dao.destroyAll(expires).then(function(){
					resolve(expires.length);
				}, function(error) {
					console.error(error.message);
					reject(error.message);
				});
			} else {
				console.error("expire " + expires.length);
				resolve(0);
			}
	    }, function(error) {
	    	console.error(error.message);
	        reject(error.message);
	    });
	});
}
