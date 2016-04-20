class RankUI extends eui.Component {
    private listRank:eui.List;

    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/rankUISkin.exml";
    }

    private uiCompHandler():void {
		var self = this;
        application.dao.fetch("Customer", {}, {limit: 8, order: ' DESC'}, function(succeed, customers){
               var dsCustomers:Array<Object> = new Array<Object>();
			   
            if (succeed) {
                for(var i = 0; i < customers.length; i++) {
                    dsCustomers.push({ icon: customers[i].avatar,name: customers[i].name,metal: customers[i].metal});
                }
            }
				
			self.listRank.dataProvider = new eui.ArrayCollection( dsCustomers );
			self.listRank.itemRenderer = RankIRSkin;
        })
    }
}

class RankIRSkin extends eui.ItemRenderer {
    constructor() {
        super();
        
        this.skinName = "rankIRSkin";
    }
}