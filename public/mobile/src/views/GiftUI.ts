class GiftUI extends eui.Component {
    private imgPick1: eui.Image;
    private imgPick2: eui.Image;
    private imgPick3: eui.Image;
    private imgPick4: eui.Image;
    private imgPick5: eui.Image;
    private imgPick6: eui.Image;
    private imgPick7: eui.Image;
    private imgPick8: eui.Image;
   
    private imgRet: eui.Image;
    
    private gifts: any[];
	
    //在线礼物计时
	private onlineGiftTimeout: number;
	private lblOnlineGiftTimeout:eui.Label;
    
    //月票剩余天数，如果是终生卡就写永久
    private lblTicketTimeout:eui.Label;
    
    //秒产奖励下一个需要达到的秒产
    private lblOutput:eui.Label;

    constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);

        this.skinName = "resource/custom_skins/giftUISkin.exml";

        this.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.hideUI(this);
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
        this.imgPick7.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.onOutputGift();
        },this);
        this.imgPick8.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.onAttentionGift();
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
            application.hideUI(this);
            application.gotoAuction();
        }
	}
	
	private onTicketGift() {
        if (this.gifts[3].locked == 0) {
            this.pick(3,this.imgPick4);
        } else if (this.gifts[3].locked == 1) {
            application.hideUI(this);
            application.gotoTool();
        }
	}
    
    private onShareGift() {
		var self = this;
		
        if (self.gifts[4].locked == 0) {
            self.pick(4,self.imgPick5);
        } else if (self.gifts[4].locked == 1) {
            application.share(function () {
                self.gifts[4].locked = 0;

                application.dao.save("Gift",self.gifts[4], null);

                self.setImage(self.imgPick5,self.gifts[4]);
			})
        }
    }
    
    private onFirstChargeGift() {
        if (this.gifts[5].locked == 0) {
            this.pick(5,this.imgPick6);
        } else if (this.gifts[5].locked == 1) {
            application.hideUI(this);
            application.showUI(new FirstChargeBonusUI());
        }
    }
	
	private onOutputGift() {
		var gift = this.gifts[6];
		
		if (application.log10(application.customer.output) > parseInt(gift.data)) {
			this.pick(1,this.imgPick7);
		} else {
			if(gift.locked == 0) {
                this.income(gift,this.imgPick7);
			}
		}
	}
	
	private onAttentionGift() {
		var self = this;
		
        if (self.gifts[7].locked == 0) {
            self.pick(7,self.imgPick8);
        } else if (self.gifts[7].locked == 1) {
            application.attention(function () {
                self.gifts[7].locked = 0;

                application.dao.save("Gift",self.gifts[7], null);

                self.setImage(self.imgPick8,self.gifts[7]);
			})
        }
	}

    public refresh(): void {
        this.uiCompHandler();
    }

    private uiCompHandler(): void {
        var self = this;

        application.dao.fetch("Gift", {customer_id: application.customer.id}, {order : 'category ASC'}, function(succeed, gifts){
            self.setImage(self.imgPick1,gifts[0]);
            
            self.setImage(self.imgPick2,gifts[1]);
            
            self.setImage(self.imgPick3,gifts[2]);
            
            //如果今天的在线时间礼物还没有领取，检查一下是否可以领取了
            if (gifts[3].locked == 1) {
				var lastLogin = new Date(application.customer.last_login);
				var today = new Date();
				var diff = (today.getTime() - lastLogin.getTime()) / 1000;
				if (diff > 60 * 60) {
					//已经过了一小时，可以领取了
					gifts[3].locked = 0;
				} else {
					//在线还不到1个小时，启动定时器
					var timer: egret.Timer = new egret.Timer(1000, diff);
					self.onlineGiftTimeout = diff;
					timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
						self.lblOnlineGiftTimeout.text = (Math.floor(self.onlineGiftTimeout / 60)).toString() + "：" + (self.onlineGiftTimeout % 60).toString();
						self.onlineGiftTimeout -= 1;
					}, self);

					timer.start();				
				}
			}
            self.setImage(self.imgPick4,gifts[3]);
            
            //月票礼物
			if (application.customer.ticket && application.customer.ticket.length > 1) {
				var ticketTimeout = new Date(application.customer.ticket);
				var now = Date.now();
				
				var timeDiff = ticketTimeout.getTime() - now.getTime();
				if (timeDiff < 0) {
					self.lblTicketTimeout.text = "";
				} else {
					var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
					if (diffDays > 30) {
						self.lblTicketTimeout.text = "永久";
					} else {
						self.lblTicketTimeout.text = diffDays.toString() + "天";
					}
				}
			} else {
            	self.lblTicketTimeout.text = "";
			}
            self.setImage(self.imgPick5,gifts[4]);
            
            self.setImage(self.imgPick6,gifts[5]);
            
            //秒产礼物
            if (gifts[6].data && gifts[6].data.length > 0) {
                self.lblOutput.text = (parseInt(gifts[6].data) * 10).toString();
            } else {
                self.lblOutput.text = "100";
            }
            self.setImage(self.imgPick7,gifts[6]);
            self.setImage(self.imgPick8,gifts[7]);
            
            self.gifts = gifts;
        })
    }
    
    private setImage(imgPic: eui.Image, gift:any) {
        if(gift.locked == 1) {
            if (gift.category == 5) {
                imgPic.source = "share_png";
            } else if(gift.category == 7) {
                imgPic.source = "att_png";
            } else {
                imgPic.source = "unpick_png";
            }
        } else if(gift.locked == 0) {
            imgPic.source = "pick_png";
        } else {
            imgPic.source = "picked_png";
        }
    }
    
    private pick(index: number,imgPic: eui.Image) {
        var gift = this.gifts[index];
        if(gift.locked == 0) {
            gift.locked = 2;
            application.dao.save("Gift", gift);
            
            this.income(gift,imgPic);
        }
    }
	
    private income(gift: any,imgPic: eui.Image): void {
        var self = this;
        
		application.customer.metal += gift.metal;
		application.customer.gold  += gift.gold;
		application.customer.diamond += gift.diamond;

		application.dao.save("Customer",application.customer,function(succeed,c) {
			if(succeed) {
				application.refreshCustomer(-gift.gold, -gift.diamond, 0,0,null);

                self.setImage(gift,imgPic);
			}
		});	
	}
}