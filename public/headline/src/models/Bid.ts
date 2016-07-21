class Bid {
	public attrs: any;
	
	public constructor() {
		this.attrs = null;
	}
	
    public static day(): string {
		//中午12点开标，所以12点之后的投标算明天的
		var dt = new Date();
		if (dt.getHours() >= 12) {
			dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    }
    
    public refresh(customer:Customer) {
    	var self = this;
    	
        return Q.Promise(function(resolve, reject, notify) {
            application.dao.fetch("Bid",{succeed: 0, day :Bid.day(), customer_id: customer.attrs.id}, {limit : 1}).then(function(bids){
                if (bids.length > 0) {
                    self.attrs = bids[0];
                } else {
                    self.attrs = null;
                }
    
                resolve(self);
	        }, function(error) {
	            reject(error);
	        })
        });
    }
    
    public static earn(customer:Customer): void {
    	var self = this;
    	
		application.dao.fetch("Bid", {customer_id: customer.attrs.id, succeed: {$gte:1}, claimed: 0}, {}).then(function(bids){
			if (bids.length > 0) {
				for(var i = 0; i < bids.length; i++) {
					customer.attrs.gold -= bids[i].gold;
					if (bids[i].succeed == 1) {
						customer.attrs.metal += 1;
						customer.attrs.diamond += 2000;
						application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, "拍卖头名", 2000); 
					}

					bids[i].claimed = 1;
					application.dao.save("Bid", bids[i]);
				}
				
				customer.saveNow();
			}
		});
    }
}
