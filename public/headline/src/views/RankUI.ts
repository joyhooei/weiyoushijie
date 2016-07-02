class RankUI extends eui.Component {
    private imgBack: eui.Button;
    
    private listRank:eui.Group;
    private listMyRank: eui.Group;

    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/rankUISkin.exml";
    }
    
    public refresh(): void {
		var self = this;
		
		var max = 20;
		
        application.dao.fetch("Customer", {}, {limit: max + 2, order: 'metal DESC, accumulated_gold DESC'}, function(succeed, customers){
            if (succeed) {
				var rank = 0;
				var last = null;
				var me   = null;
				var next = null;
				
                self.listRank.removeChildren();
                for(var i = 0;i < Math.min(max + 1, customers.length);i++) {
					if (i < max) {
						var item = new RankItem(false,i + 1,customers[i]);
						self.listRank.addChild(item);
					}
				
					if (application.customer.id == customers[i].id) {
						me   = application.customer;					
						rank = i + 1;
						
						//如果我是第一名就没有last
						if (i > 0) {
							last = customers[i - 1];
						}
						
						//下一名肯定是有的，因为多取了2条记录
						next = customers[i + 1];
					}
                }
				
				if (me) {
                    self.listMyRank.removeChildren();
                    
					if (last) {
						self.listMyRank.addChild(new RankItem(true,rank - 1,last));
					}
					self.listMyRank.addChild(new RankItem(true,rank,me));
					self.listMyRank.addChild(new RankItem(true,rank + 1,next));
				} else {
					application.dao.fetch("Rank", {customer_id: application.customer.id}, {limit: 1}, function(succeed, myRanks) {
                        if(succeed && myRanks.length == 1) {
							application.dao.fetch("Rank", {rank: [myRanks[0].rank -1, myRanks[0].rank, myRanks[0].rank + 1]}, {order: 'rank ASC'}, function(succeed, ranks) {
								if (succeed && ranks.length > 0) {
									var ids = [];
									for (var i = 0; i < ranks.length; i++) {
										ids.push(ranks[i].customer_id);
									}
									application.dao.fetch("Customer", {id: ids}, {limit: ids.length}, function(succeed, customers) {
										if (succeed && customers.length > 0) {
											self.listMyRank.removeChildren();

											for(var i = 0; i < ranks.length; i++) {
												for (var j = 0; j < customers.length; j++) {
													if (ranks[i].customer_id == customers[j].id) {
														var item = new RankItem(true, ranks[i].rank, customers[j]);
														self.listMyRank.addChild(item);
													}
												}
											}
										}
									});
								}
							});
						}
					});
				}
            }
        })		
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
