class GiftUI extends eui.Component {
    private imgPick1: eui.Image;
    private imgPick2: eui.Image;
    private imgPick3: eui.Image;
    private imgPick4: eui.Image;
    private imgPick5: eui.Image;
    private imgPick6: eui.Image;
    
    private imgRet: eui.Image;
    
    private gifts: any[];

    constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);

        this.skinName = "resource/custom_skins/giftUISkin.exml";

        this.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            this.back();
        },this);	
        
        this.imgPick1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this.onLoginGift();
        },this);
        this.imgPick2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.onOnlineGift();
        },this);
        this.imgPick3.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.onBidGift();
        },this);
        this.imgPick4.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.onTicketGift();
        },this);
        this.imgPick5.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.onShareGift();
        },this);
        this.imgPick6.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.onFirstChargeGift();
        },this);
    }
    
    private onLoginGift() {
        this.pick(0, this.imgPick1);
    }
    
    private onOnlineGift() {
        this.pick(1,this.imgPick2);
    }
	
	private onBidGift() {
        if (this.gifts[2].locked == 0) {
            this.pick(2,this.imgPick3);
        } else if (this.gifts[2].locked == 1) {
            application.gotoAuction();
        }
	}
	
	private onTicketGift() {
        if (this.gifts[3].locked == 0) {
            this.pick(3,this.imgPick4);
        } else if (this.gifts[3].locked == 1) {
            application.gotoTool();
        }
	}
    
    private onShareGift() {
		var self = this;
		
        if (self.gifts[4].locked == 0) {
            self.pick(4,self.imgPick5);
        } else if (self.gifts[4].locked == 1) {
            nest.share.share({ title: '',description: '',url: '',img_url: '',img_title:''}, function (data) {
				if(data.result == 0) {
					self.gifts[4].locked = 0;
					
					application.dao.save("Gift",self.gifts[4], null);
					
					self.setImage(self.imgPick5,self.gifts[4]);
				} else if(data.result == -1) {
					Toast.launch("取消了分享");
				} else {
					Toast.launch("分享失败");
				}
			})  
        }
    }
    
    private onFirstChargeGift() {
        if (this.gifts[5].locked == 0) {
            this.pick(5,this.imgPick6);
        } else if (this.gifts[5].locked == 1) {
            application.showUI(new FirstChargeBonusUI());
        }
    }

    public refresh(): void {
        this.uiCompHandler();
    }

    private uiCompHandler(): void {
        var self = this;

        application.dao.fetch("Gift", {customer_id: application.customer.id}, {order : 'category ASC'}, function(succeed, gifts){
            self.setImage(self.imgPick1,gifts[0]);
            
            if (gifts[1].locked != 0) {
				var lastDate  = new Date(gifts[1].update_time);
				var loginDate = new Date(application.customer.last_login);
				if ( lastDate < loginDate) {
					lastDate = loginDate;
				}
				
				var today = new Date();
				if (today.getTime() - lastDate.getTime() > 60 * 60 * 1000) {
					gifts[1].locked = 0;
					
					application.dao.save("Gift", gifts[1], null);
				}
			}
            self.setImage(self.imgPick2,gifts[1]);
            
            self.setImage(self.imgPick3,gifts[2]);
            self.setImage(self.imgPick4,gifts[3]);
            self.setImage(self.imgPick5,gifts[4]);
            self.setImage(self.imgPick6,gifts[5]);
            
            self.gifts = gifts;
        })
    }
    
    private setImage(imgPic: eui.Image, gift:any) {
        if(gift.locked == 1) {
            imgPic.source = "unpick_png";
        } else if(gift.locked == 0) {
            imgPic.source = "pick_png";
        } else {
            imgPic.source = "picked_png";
        }
    }
    
    private pick(index: number,imgPic: eui.Image) {
        var self = this;
        
        var gift = this.gifts[index];
        if(gift.locked == 0) {
            gift.locked = 2;
            application.dao.save("Gift", gift, null);
            
            application.customer.metal += gift.metal;
            application.customer.gold  += gift.gold;
            application.customer.diamond += gift.diamond;
            
            application.dao.save("Customer",application.customer,function(succeed,c) {
                if(succeed) {
                    application.refreshCustomer(-gift.gold, -gift.diamond, 0,0,null);
                    
                    self.setImage(imgPic, gift);
                }
            });
        }
    }

    private back(): void {
        this.parent.removeChild(this);
    }
}