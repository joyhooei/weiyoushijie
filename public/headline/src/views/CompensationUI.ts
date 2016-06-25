class CompensationUI extends eui.Component {
    private imgBack: eui.Button;
	private imgPick: eui.Button;
	private imgClear: eui.Button;
    
    private listCompensation:eui.Group;
	
	private compensations: any[];
	private compensationsRead: any[];

    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/compensationUI.exml";
    }
    
    public refresh(): void {
		var self = this;
		
		self.listCompensation.removeChildren();
		
		self.imgClear.source = "";
		
        application.dao.fetch("Compensation",{ customer_id: application.customer.id,state: 0 }, {order: "create_time DESC"},function(succeed,compensations) {
            if(succeed && compensations.length >= 1) {
				self.compensations = compensations;				
				self.renderCompensations();
				
				self.imgPick.source = "";
			} else {
				self.imgPick.source = "";
			}
		});
		
        application.dao.fetch("Compensation",{ customer_id: application.customer.id,state: 1 }, {order: "update_time DESC"},function(succeed,compensations) {
            if(succeed && compensations.length >= 1) {
				self.compensationsRead = compensations;
				self.renderCompensations();
			}
		});
    }
	
	private renderCompensations(compensations) {
		for (var i = 0; i < compensations.length; i++) {
			this.listCompensation.addChild(new CompensationItem(compensations[i]));
		}
		
		this.imgClear.source = "";
	}

    private uiCompHandler():void {
        this.refresh();

        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.hideUI(this);
        },this);

        this.imgClear.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this.compensations && this.compensations.length > 0) {
				for (var i = 0; i < this.compensations.length; i++) {
					this.compensations[i].state = 2;
					application.dao.save("Compensation", this.compensations[i]);
				}
			}
			
			if (this.compensationsRead && this.compensationsRead.length > 0) {
				for (var i = 0; i < this.compensationsRead.length; i++) {
					this.compensationsRead[i].state = 2;
					application.dao.save("Compensation", this.compensationsRead[i]);
				}
			}
			
            this.refresh();
        },this);

        this.imgPick.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this.compensations && this.compensations.length > 0) {
				var gold    = 0;
				var diamond = 0;
				var metal   = 0;
				var vip     = 0;
				
				var bonus = [];
				for (var i = 0; i < this.compensations.length; i++) {
					var c = this.compensations[i];
					
					if (c.gold > 0) {
						gold += c.gold;						
					}
					
					if (c.diamond > 0) {
						diamond += c.diamond;						
					}
					
					if (c.metal > 0) {
						metal += c.metal;						
					}
					
					if (c.vip > 0) {
						vip = c.vip;						
					}
					
					c.state = 1;
					application.dao.save("Compensation", c);
				}
				
                var bonus = [];
                if(gold != 0) {
					application.customer.gold += gold;
                    bonus.push(gold + "金币");
                }
                if(metal != 0) {
					application.customer.metal += metal;
                    bonus.push(metal + "奖章");
                }
                if(diamond != 0) {
					application.customer.diamond += diamond;
                    bonus.push(diamond + "钻石");
                }
                if(vip == 1) {
                    application.customer.vip = 1;
                    var dt = new Date();
                    dt = new Date(dt.getTime() + 1000 * 60 * 60 * 24 * 30);
                    application.customer.ticket = dt.toString(); 

                    bonus.push("价值19元的月票");
                }
                if(vip == 2) {
                    application.customer.vip = 2;
                    application.customer.ticket = "";

                    bonus.push("价值49元的终身VIP");
                }

                title += bonus.join("，");
                title += "的额外奖励，谢谢参与";				

                Toast.launch(title);
                
                application.saveCustomerNow();
				
				this.refresh();
			}
        },this);
    } 
}