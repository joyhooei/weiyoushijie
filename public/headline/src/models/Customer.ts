class Customer {
	public me: any;
	
	putlic vip: any;
	
	private saveSeconds: number = 0;
	
	constructor(me: any) {
        super();
        
        this.me = me;

        if(!this.me.earned_gold) {
            this.me.earned_gold = 0;
        }
        
        this.vip = Vip.createVip(this.me.charge);
        
        this.checkTicket();
    }

	public resetTicket(vip: number): void {
		this.me.vip = vip;
		
		if (vip == 0 || vip == 2) {
			this.me.ticket = "";
		} else {
			var now = new Date();
			now = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);
			this.me.ticket = now.toString();
		}
		
		this.saveNow();
	} 

    //检查是否ticket超期了
    public checkTicket(): void {
        if(this.me.vip == 1) {
            if(this.me.ticket && this.me.ticket.length > 1) {
                var ticketTimeout = new Date(this.me.ticket);
                var now = new Date();
                if(ticketTimeout.getTime() < now.getTime()) {
                    this.resetTicket(0);
                }
            } else {
                this.resetTicket(1);
            }
        }
    }
    
    public save() {
		var now = (new Date()).getTime() / 1000;
        if (now - this.saveSeconds >= 120) {
            this.saveNow();
		} else {
			application.dao.dispatchEventWith("Customer", true, this.me);
		}
    }

    public saveNow() {
    	var self = this;
    	
        self.saveSeconds = (new Date()).getTime() / 1000;

        self.me.version = application.version;
        self.me.gold = Math.max(0,self.me.gold);
        self.me.earned_gold = Math.max(0,self.me.earned_gold);
        self.me.accumulated_gold = Math.max(self.me.accumulated_gold, self.me.gold);
        self.me.diamond = Math.max(0, self.me.diamond);
        application.dao.save("Customer",self.me).then(function(customer){
            if (self.me.charge != application.vip) {
                application.vip = Vip.createVip(self.me.charge);
            }
        });
    }

    public earnOfflineGold() {
        if (this.me.offline_gold > 0) {
            this.earnGold(this.me.offline_gold);
            this.saveNow();
        }
    }
    
    public earnGold(gold:number) {
		//处理大数 + 小数，小数被四舍五入的问题
        this.me.earned_gold += gold;
        
        var oldGold = this.me.gold;
        
        this.me.gold += this.me.earned_gold;
        if (oldGold != this.me.gold) {
            this.me.accumulated_gold += this.me.earned_gold;
            
            this.me.earned_gold = 0;			
        }
        
        this.save();
    }
    
    public static useGold(gold:number) {
        if(this.me.earned_gold > gold) {
            this.me.earned_gold -= gold;
        } else {
            this.me.gold = this.me.gold + this.me.earned_gold - gold;
            this.me.earned_gold = 0;
        }
        
        this.saveNow();
    }

    public usableGold() {
        if (application.bid) {
            return Math.max(0,this.me.gold + this.me.earned_gold - application.bid.current.gold);
        } else {
            return Math.max(0,this.me.gold + this.me.earned_gold);
        }
    }
    
    public static buyOutput(gold:number, diamond: number, output:number): void {
        gold    = Math.abs(gold);
        diamond = Math.abs(diamond);
        output  = Math.abs(output);
        
        this.me.diamond -= diamond;	
        this.me.output  += output;
        this.useGold(gold);
        
        if (this.me.output >= 100) {
			if(Utility.log10(this.me.output) > Utility.log10(this.me.output - output)) {
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
