class RankUI extends eui.Component {
    private listRank:eui.Group;
    private listMyRank: eui.Group;

    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/rankUISkin.exml";
    }
    
    public refresh(): void {
		var self = this;
        
        self.listRank.removeChildren();
        application.dao.fetch("Customer", {}, {limit: 8, order: 'metal DESC'}, function(succeed, customers){
            if (succeed) {
                for(var i = 0; i < customers.length; i++) {
					self.addCustomer(false, i + 1, customers[i]);
                }
            }
        })
		
        self.listMyRank.removeChildren();
		application.dao.rest("rank", {customer_id: application.customer.id}, function(succeed, ranks) {
			if (succeed) {
				for (var i = 0; i < ranks.length; i++) {
                    if (ranks[i].customer) {
					    self.addCustomer(true, ranks[i].rank, ranks[i].customer);
                    }
				}
			}
		});
    }

    private uiCompHandler():void {
        this.refresh();
    } 
	
	private addCustomer(showMe:boolean, rank: number, customer: any) {
		var item = new RankItem(showMe, rank, customer);
		if (showMe) {
			this.listMyRank.addChild(item);
		} else {
			this.listRank.addChild(item);
		}
	}

    private back(): void {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    }
}
