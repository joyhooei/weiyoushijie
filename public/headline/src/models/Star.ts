class Star {
    public static getUpgrade(price: number): number {
        for (let i = 1; i <= application.star.opened_level; i++) {
		    price = price * 0.01;
        }
        
        return price;
	}
	
    public static check(star:any):any {
        if (star.opening_level > 0) {
            let now = new Date();
    		let openTime = new Date(star.open_time);
            let diff = now.getTime() + star.saving_hours * 3600000 - openTime.getTime();
            if(diff <= 0) {
            	star.opened_level = star.opening_level;
            	star.opening_level = 0;
            	star.open_time = "";
            	star.saving_hours = 0;
            	application.dao.save("Star", star);
    		}
    	}
    	
    	return star;
    }
    
    public static create(customer:Customer): Q.Promise<any> {
        let star:any = {};
        star.customer_id = customer.attrs.id;
        star.opened_level = 0;
    	star.opening_level = 0;
    	star.open_time = "";
    	star.saving_hours = 0;
    	star.last_pick_time = (new Date()).toString();
    	star.sticks = 0;
    	return application.dao.save("Star", star);
    }
    
    public static refresh(customer:Customer): Q.Promise<any[]> {
        return Q.Promise<any[]>(function(resolve, reject, notify) {
            application.dao.fetch("Star", {customer_id: customer.attrs.id}, {limit : 1}).then(function(stars){
                if (stars.length == 1) {
                    application.star = Star.check(stars[0]);
                    resolve(application.star);
                } else {
                    Star.create(customer).then(function(star){
                        application.star = star;
                        resolve(application.star);
                    })
                }                
            }, function(error){
                reject(error);
            });
        });
    }
}
