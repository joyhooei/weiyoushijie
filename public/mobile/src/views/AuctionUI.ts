class AuctionUI extends eui.Component{
	private lblGold:eui.Label;
	
	private lblLastBid:eui.Label;
	private lblMaxBid:eui.Label;
	private lblCurrentBid:eui.Label;
	
	private imgBid:eui.Image;
	private imgRet:eui.Image;
	
	private grpTrack: eui.Group;
	private lblTrack: eui.Label;
	private imgFront: eui.Image;
	private imgThumb: eui.Image;
	
	private bid:any;
	private delta:number;
	
	private startX:number;
	
    constructor() {
        super();
		
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    
    public refresh(): void {
        this.uiCompHandler();
    }

    private uiCompHandler():void {
		var self = this;
		
		self.lblGold.text = application.format(application.customer.gold);
		
		//中午12点开标，所以12点之后的投标算明天的
		var dt = new Date();
		if (dt.getHours() >= 12) {
			dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
		}
		
		var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
		
        self.bid = { gold: 0,day: today,customer_id: application.customer.id,succeed: 0 };
		self.delta = 0;
        
		self.renderLastBid(today);
		self.renderMaxBid(today);	
		
        self.grpTrack.x = self.imgThumb.x;
        self.lblTrack.text = "0%";
        self.imgFront.x = self.imgThumb.x;	
        self.imgFront.y = self.imgThumb.y;	
        self.imgFront.width = 0;	
        self.renderCurrentBid(0);
		
        self.imgBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onBid, this);
		self.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			this.back();
        }, this);
		
		self.grpTrack.touchEnabled = true;
        self.grpTrack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onBeginChangeBid , this);
        self.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE,self.onChangeBid,this);
    }
	
	private renderLastBid(today:string): void {
		var self = this;
		
        application.dao.fetch("Bid",{ succeed: 0, day :today, customer_id: application.customer.id}, {limit : 1}, function(succeed, bids){
            if (succeed && bids.length > 0) {
				self.bid = bids[0];
			}
			
			self.lblLastBid.text = application.format(self.bid.gold);
        })
	}
	
	private renderMaxBid(today:string): void {
		var self = this;
		
        application.dao.fetch("Bid",{ succeed: 0, day :today }, {limit : 1, order:"gold DESC"}, function(succeed, bids){
            if (succeed && bids.length > 0) {
				self.lblMaxBid.text = application.format(bids[0].gold);			
            } else {
				self.lblMaxBid.text = "0";
			}
        })
	}
	
	private renderCurrentBid(gold: number): void {
		this.delta = Math.round(gold);
		
		this.lblCurrentBid.text = this.delta;
	}
	
	private onBid(): void {
		var self = this;
		
		if (self.delta > 0) {
			self.bid.gold += self.delta;
			application.dao.save("Bid", self.bid, function(succeed, bid){
				if (succeed) {
					Toast.launch("投标成功");

					application.bid = self.bid;				
					application.refreshCustomer(0 - self.delta, 0, 0, 0, null);

					self.back();
				} else {
					Toast.launch("投标失败，请稍后再试");
				}
			});
		} else {
			Toast.launch("请追加投标金币");
		}
	}
	
	private back(): void {
		this.dispatchEventWith( GameEvents.EVT_RETURN );
	}

    private onBeginChangeBid(e: egret.TouchEvent): void {
        this.startX = e.stageX;
    }
	
	private onChangeBid(e:egret.TouchEvent): void {
        let step = e.stageX - this.startX;
        this.startX = e.stageX;
        
        let target = Math.max(this.imgThumb.x, this.grpTrack.x + step);
        target = Math.min(this.imgThumb.width + this.imgThumb.x - this.grpTrack.width,target);
        this.grpTrack.x = target;
 
        var percent = Math.round(100 * (this.grpTrack.x - this.imgThumb.x)  / (this.imgThumb.width - this.grpTrack.width) );
		this.lblTrack.text = percent.toString() + "%";

		this.renderCurrentBid(application.customer.gold * percent / 100);
        this.imgFront.width = this.grpTrack.x - this.imgThumb.x + 20;	
	}
}