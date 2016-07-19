class Customer {
	public static resetTicket(vip: number): void {
		application.customer.vip = vip;
		
		if (vip == 0 || vip == 2) {
			application.customer.ticket = "";
		} else {
			var now = new Date();
			now = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);
			application.customer.ticket = now.toString();
		}
		
		Customer.saveNow();
	} 

    //检查是否ticket超期了
    public static checkTicket(): void {
        if(application.customer.vip == 1) {
            if(application.customer.ticket && application.customer.ticket.length > 1) {
                var ticketTimeout = new Date(application.customer.ticket);
                var now = new Date();
                if(ticketTimeout.getTime() < now.getTime()) {
                    Customer.resetTicket(0);
                }
            } else {
                Customer.resetTicket(1);
            }
        }
    }
    
    public static  save() {
		var now = (new Date()).getTime() / 1000;
        if (now - application.saveSeconds >= 120) {
            Customer.saveNow();
		} else {
			application.dao.dispatchEventWith("Customer", true, application.customer);
		}
    }

    public static saveNow() {
        application.saveSeconds = (new Date()).getTime() / 1000;

        application.customer.version = application.version;
        application.customer.gold = Math.max(0,application.customer.gold);
        application.customer.earned_gold = Math.max(0,application.customer.earned_gold);
        application.customer.accumulated_gold = Math.max(application.customer.accumulated_gold,application.customer.gold);
        application.customer.diamond = Math.max(0,application.customer.diamond);
        application.dao.save("Customer",application.customer, function(succeed, customer){
            if (application.customer.charge != application.vip) {
                application.vip = Vip.createVip(application.customer.charge);
            }
        });
    }

    public static earnOfflineGold() {
        if (application.customer.offline_gold > 0) {
            application.earnGold(application.customer.offline_gold);
            application.saveCustomerNow();
        }
    }
    
    public static earnGold(gold:number) {
		//处理大数 + 小数，小数被四舍五入的问题
        application.customer.earned_gold += gold;
        
        var oldGold = application.customer.gold;
        
        application.customer.gold += application.customer.earned_gold;
        if (oldGold != application.customer.gold) {
            application.customer.accumulated_gold += application.customer.earned_gold;
            
            application.customer.earned_gold = 0;			
        }
        
        Customer.save();
    }
    
    public static useGold(gold:number) {
        if(application.customer.earned_gold > gold) {
            application.customer.earned_gold -= gold;
        } else {
            application.customer.gold = application.customer.gold + application.customer.earned_gold - gold;
            application.customer.earned_gold = 0;
        }
        
        Customer.saveNow();
    }

    public static usableGold() {
        if (application.bid) {
            return Math.max(0,application.customer.gold - application.bid.gold + application.customer.earned_gold);
        } else {
            return Math.max(0,application.customer.gold + application.customer.earned_gold);
        }
    }
    
    public static buyOutput(gold:number, diamond: number, output:number): void {
        gold    = Math.abs(gold);
        diamond = Math.abs(diamond);
        output  = Math.abs(output);
        
        application.customer.diamond -= diamond;	
        application.customer.output  += output;
        Customer.useGold(gold);
        
        if (application.customer.output >= 100) {
			if(application.log10(application.customer.output) > application.log10(application.customer.output - output)) {
				application.dao.fetch("Gift", {customer_id: application.customer.id, category: 7}, {limit: 1}).then(function(gifts){
					if (gifts.length > 0) {
						var gift = gifts[0];
						gift.locked = 0;
						application.dao.save("Gift", gift);
					}
				});
			}
		}
    }
    
	public static avatarUrl(customer: any): string {
		if (customer.avatar && customer.avatar.length > 1) {
			return customer.avatar;
		} else {
            var url = application.baseUrl + "headline/resource/art/";
			if (customer.sex == 1) {
				return url + "headM.png";
			} else if (customer.sex == 2) {
				return url + "headF.png";
			} else {
                return url + "head.png";
            }
		}
	}    
}
