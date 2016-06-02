class RankUI extends eui.Component {
    private imgBack: eui.Button;

    private listRank:eui.Group;
    private listMyRank: eui.Group;
	
	private ranks: Any[];
	private customers: Any[];
	
	private dataReady: Number;

    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/rankUISkin.exml";
    }
    
    public refresh(): void {
		var self = this;
		
		self.dataReady = 0;
		
		application.dao.rest("rank", {customer_id: application.customer.id}, function(succeed, ranks) {
			if (succeed) {
				self.ranks = ranks;
				
                self.dataReady++;
				if (self.dataReady == 2) {
					self.renderCustomers();
				}
			}
		});
        
        application.dao.fetch("Customer", {}, {limit: 8, order: 'metal DESC'}, function(succeed, customers){
            if (succeed) {
				self.customers = customers;
				
                self.dataReady++;
				if (self.dataReady == 2) {
					self.renderCustomers();
				}
            }
        })		
    }
	
	private renderCustomers() {
		//同步数据，以免两次获取的用户信息已经发生了变化
		for(var i = 0; i < this.ranks; i++) {
			if (this.ranks[i].customer) {
				for var j = 0; j < this.customers; j++) {
					if (this.ranks[i].customer.id == this.customers[j].id) {
						this.customers[j].metal = this.ranks[i].customer.metal;
						this.customers[j].gold  = this.ranks[i].customer.gold;
					}
				}
			}
		}

        this.listMyRank.removeChildren();
		for(var i = 0; i < this.ranks; i++) {
			if (this.ranks[i].customer) {
				var item = new RankItem(true, this.ranks[i].rank, this.ranks[i].customer);
				this.listMyRank.addChild(item);
			}
		}

        this.listRank.removeChildren();
		for(var i = 0; i < this.customers; i++) {
			var item = new RankItem(false, i + 1, this.customers[i]);
			this.listRank.addChild(item);
		}		
	}

    private uiCompHandler():void {
        this.refresh();

        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.gotoHome();
        },this);
    } 

    private back(): void {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    }
}
