class Star {
    public static check(customer): Q.Promise<any[]> {
        return Q.Promise<any[]>(function(resolve, reject, notify) {
            application.dao.fetch("Star", {customer_id: customer.attrs.id}, {limit : 1}).then(function(stars){
                if (stars.length == 1) {
                    application.star = stars[0];
                    
                    if (application.star.opening_level > 0) {
                        let now = new Date();
                		let openTime = new Date(application.star.open_time);
                        let diff = Math.floor(now.getTime() - openTime.getTime()) - applicaton.star.saving_hours * 3600000;
                        if(diff <= 0) {
                        	application.star.opened_level = application.star.opening_level;
                        	application.star.opening_level = 0;
                        	application.star.open_time = "";
                        	application.star.saving_hours = 0;
                        	application.save("Star", star);
                		}
                	}
                } else {
                    application.star.customer_id = customer.attrs.id;
                    application.star.opened_level = 0;
                	application.star.opening_level = 0;
                	application.star.open_time = "";
                	application.star.saving_hours = 0;
                	application.star.last_pick_time = "";
                	application.star.sticks = 0;
                	application.save("Star", star);                    
                }
                
                resolve(star);
            });
        }, function(error){
            reject(error);
        });
    }
}
