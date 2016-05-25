class RankUI extends eui.Component {
    private listRank:eui.List;
    private listMyRank:eui.List;

    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/rankUISkin.exml";
    }

    private uiCompHandler():void {
		var self = this;
        
        application.dao.fetch("Customer", {}, {limit: 8, order: 'metal DESC'}, function(succeed, customers){
            if (succeed) {
                for(var i = 0; i < customers.length; i++) {
					if (customers[i].metal > 0) {
						self.addCustomer(false, i + 1, customers[i]);
					}
                }
            }
        })
		
		application.dao.rest("rank", {customer_id: application.customer.id}, function(succeed, ranks) {
			if (succeed) {
				for (var i = 0; i < ranks.length; i++) {
					self.addCustomer(true, ranks[i].rank, ranks[i].customer);
				}
			}
		});
    } 
	
	private addCustomer(showMe:true, rank: number, customer: any) {
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
