class Bid {
    public static day(): string {
		//中午12点开标，所以12点之后的投标算明天的
		var dt = new Date();
		if (dt.getHours() >= 12) {
			dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    }
    
    public static refresh() {
        return Q.Promise(function(resolve, reject, notify) {
            application.dao.fetch("Bid",{ succeed: 0, day :application.bidDay(), customer_id: application.customer.id}, {limit : 1}).then(function(bids){
                if (bids.length > 0) {
                    application.bid = bids[0];				
                } else {
                    application.bid = null;
                }
    
                resolve(application.bid);
            })
        }, function(error) {
            resolve(application.bid);
        });
    }
    
    public static earn(): void {
		application.dao.fetch("Bid", {customer_id: application.customer.id, succeed: {$gte:1}, claimed: 0}, {}).then(function(bids){
			if (bids.length > 0) {
				for(var i = 0; i < bids.length; i++) {
					application.customer.gold -= bids[i].gold;
					if (bids[i].rank == 1) {
						application.customer.diamond += 2000;
						application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, "拍卖头名", 2000); 
					}

					bids[i].claimed = 1;
					application.dao.save("Bid", bids[i]);
				}
				
				Customer.saveNow();
			}
		});
    }
}
