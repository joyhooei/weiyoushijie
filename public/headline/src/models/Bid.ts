class Bid {
	public current: any;
	
	public constructor() {
		this.current = null;
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
            application.dao.fetch("Bid",{ succeed: 0, day :Bid.day(), customer_id: customer.me.id}, {limit : 1}).then(function(bids){
                if (bids.length > 0) {
                    self.bid = bids[0];
                } else {
                    self.bid = null;
                }
    
                resolve(self.bid);
            })
        }, function(error) {
            resolve(self.bid);
        });
    }
    
    public static earn(customer:Customer): void {
    	var self = this;
    	
		application.dao.fetch("Bid", {customer_id: customer.me.id, succeed: {$gte:1}, claimed: 0}, {}).then(function(bids){
			if (bids.length > 0) {
				for(var i = 0; i < bids.length; i++) {
					customer.me.gold -= bids[i].gold;
					if (bids[i].rank == 1) {
						customer.me.diamond += 2000;
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
