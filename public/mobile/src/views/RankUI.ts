class RankUI extends eui.Component {
    private listRank:eui.List;

    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/rankUISkin.exml";
    }

    private uiCompHandler():void {
		var self = this;
        
        application.dao.fetch("Customer", {}, {limit: 8, order: 'metal DESC'}, function(succeed, customers){
            var dsCustomers:Array<Object> = new Array<Object>();
			   
            if (succeed) {
                for(var i = 0; i < customers.length; i++) {
					if (i == 0) {
						var bg = "RR_png";
					} else if (i == 1) {
						var bg = "RBlue_png";
					} else if (i == 2) {
						var bg = "RB_png";
					} else {
						var bg = "RG_png";
					}
					
					var c = customers[i];
                    dsCustomers.push({ bg: bg, icon: c.avatar, name: c.name, metal: c.metal, gold: application.format(c.gold) });
                }
            }
				
			self.listRank.dataProvider = new eui.ArrayCollection( dsCustomers );
			self.listRank.itemRenderer = RankIRSkin;
        })
    }  

    private back(): void {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    }
}

class RankIRSkin extends eui.ItemRenderer {
    constructor() {
        super();
        
        this.skinName = "rankIRSkin";
    }
}