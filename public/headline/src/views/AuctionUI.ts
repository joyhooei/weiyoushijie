class AuctionUI extends eui.Component{
    private imgBack: eui.Image;

	private lblGold:eui.Label;
    private lblDiamond: eui.Label;
    private btnAddGold: eui.Button;
    private btnAddDiamond: eui.Button;
	
	private lblLastBid:eui.Label;
	private lblMaxBid:eui.Label;
	private lblCurrentBid:eui.Label;
	
	private lblMaxBidName:eui.Label;
	private imgMaxBidAvatar:eui.Image;
	
	private imgBid:eui.Image;
	
	private grpTrack: eui.Group;
	private lblTrack: eui.Label;
	private imgFront: eui.Image;
	private imgThumb: eui.Image;
	
    private btnHelp: eui.Button;
	
	private bid:any;
	private addGold: number;
	
	private startX:number;
	
    constructor() {
        super();
		
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    
    public refresh(): void {
        this.lblGold.text = Utility.format(application.customer.usableGold());
        this.lblDiamond.text = Utility.format(application.customer.attrs.diamond);
		
        var today = Bid.day();
		this.renderLastBid(today);
		this.renderMaxBid(today);	
		
        this.grpTrack.x = this.imgThumb.x;
        this.lblTrack.text = "0%";
		
        this.imgFront.x = this.imgThumb.x;	
        this.imgFront.y = this.imgThumb.y;	
        this.imgFront.width = 0;
		
		this.addGold = 0;
		this.bid = { gold: 0, day: today, customer_id: application.customer.attrs.id, claimed: 0 };
        this.renderBid(0);
    }

    private uiCompHandler():void {
		this.refresh();
		
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.gotoHome();
        },this);
        
        application.dao.addEventListener("Customer",function(evt:egret.Event){
            this.lblGold.text = Utility.format(application.customer.usableGold());
            this.lblDiamond.text = Utility.format(application.customer.attrs.diamond);
        }, this);

        this.imgBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBid, this);
		
		this.grpTrack.touchEnabled = true;
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginChangeBid , this);
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onChangeBid,this);
		
        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new BuyToolUI("time", 500));
        }, this);
                
        this.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new ChargeTipUI());
        }, this);
                
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
        	HelpUI.showAuctionHelp();
        }, this);
    }
	
	private renderLastBid(today:string): void {
		var self = this;
		
        application.dao.fetch("Bid",{ succeed: 0, day :today, customer_id: application.customer.me.id}, {limit : 1}).then(function(bids){
            if (bids.length > 0) {
				self.bid = bids[0];
				
				application.customer.bid.attrs = self.bid;
				
				self.renderBid(self.addGold);
			}
        })
	}
	
	private renderMaxBid(today:string): void {
		var self = this;
		
        application.dao.fetch("MaxBid",{ day :today }, {limit : 1}).then(function(bids){
            if (bids.length > 0) {
				self.lblMaxBid.text = application.format(bids[0].gold);			
				self.lblMaxBidName.text = bids[0].name;
				self.imgMaxBidAvatar.source = bids[0].avatar;
            } else {
				self.lblMaxBid.text = "0";
				self.lblMaxBidName.text = "";
				self.imgMaxBidAvatar.source = "";
			}
        })
	}
	
	private renderBid(gold: number): void {
		this.addGold = Math.floor(gold);
		
		this.lblCurrentBid.text = Utility.format(this.addGold);
		this.lblLastBid.text    = Utility.format(this.addGold + this.bid.gold);
	}
	
	private onBid(): void {
		var self = this;

		if (self.bid.day == Bid.day()) {
			self.bid.gold += self.addGold;
			if (self.bid.gold > 0) {
				application.dao.fetch("Blacklist", {customer_id: application.customer.attrs.id}, {limit : 1}).then(function(blacks) {
					if (blacks.length == 1) {
						Toast.launch("对不起，您由于下列原因被封号：" + blacks[0].reason + "。");
					} else {
						self.bid.claimed = 0;
						application.dao.save("Bid", self.bid);

						Gift.notify();

						application.channel.track(TRACK_CATEGORY_ACTIVITY, TRACK_ACTION_JOIN, "投标"); 

						Toast.launch("投标成功");

						application.me.bid.attrs = self.bid;

						if (application.guideUI) {
							application.guideUI.next();
						}  				

						self.back();
					}
				});
			} else {
				Toast.launch("投标的金币数量不能是0");
			}
		} else {
			Toast.launch("今天投标已经结束");
			
			application.me.bid.attrs = null;
			
			self.refresh();
		}
	}
	
	private back(): void {
		this.dispatchEventWith( GameEvents.EVT_RETURN );
	}

    private onBeginChangeBid(e: egret.TouchEvent): void {
        this.startX = e.stageX;
    }
	
	private onChangeBid(e:egret.TouchEvent): void {
        let step:number = e.stageX - this.startX;
        this.startX = e.stageX;
        
        let target:number = Math.max(this.imgThumb.x, this.grpTrack.x + step);
        target = Math.min(this.imgThumb.width + this.imgThumb.x - this.grpTrack.width,target);
        this.grpTrack.x = target;
 
        let percent:number = Math.round(100 * (this.grpTrack.x - this.imgThumb.x)  / (this.imgThumb.width - this.grpTrack.width) );
		this.lblTrack.text = percent.toString() + "%";

		this.renderBid((Math.max(0, application.customer.gold - this.bid.gold)) * percent / 100);
        this.imgFront.width = this.grpTrack.x - this.imgThumb.x + 20;
		
		this.nextStep();
	}
	
	private nextStep(): void {
		if (application.guideUI) {
            if(this.bid.gold + this.addGold > 0) {
		        application.guideUI.next();
		    }
		}	
	}
}
