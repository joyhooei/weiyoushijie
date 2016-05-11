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
	
    constructor() {
        super();
		
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
		
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }

    private uiCompHandler():void {
		var self = this;
		
		self.lblGold.text = application.format(application.customer.gold);
		
		var dt = new Date();
		var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
		
		self.renderLastBid(today);
		self.renderMaxBid(today);		
		
        self.imgBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onBid, this);
		self.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			this.back();
        }, this);
		
		self.grpTrack.touchEnabled = true;
		self.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onChangeBid , this);
    }
	
	private renderLastBid(today:string): void {
		var self = this;
		
        application.dao.fetch("Bid",{ succeed: 0, day :today}, {limit : 1}, function(succeed, bids){
            if (succeed && bids.length > 0) {
				self.bid = bids[0];				
            } else {
				self.bid = {gold: 0, day: today, customer_id: application.customer.id, succeed: 0};
			}
			
			self.lblLastBid.text = application.format(self.bid.gold);
			
			self.renderCurrentBid(self.bid.gold);
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
		this.bid.gold = Math.round(gold);
		
		this.lblCurrentBid.text = application.format(this.bid.gold);
	}
	
	private onBid(): void {
		var self = this;
		
		application.dao.save("Bid", self.bid, function(succeed, bid){
			if (succeed) {
				Toast.launch("投标成功");
				
				self.back();
			} else {
				Toast.launch("投标失败，请稍后再试");
			}
		});
	}
	
	private back(): void {
		this.dispatchEventWith( GameEvents.EVT_RETURN );
	}
	
	private onChangeBid(e:egret.TouchEvent): void {
		let tx:number = e.stageX;
		tx = Math.max(this.imgThumb.x, tx);
		tx = Math.min(this.imgThumb.width + this.imgThumb.x - this.grpTrack.width, tx);
		this.grpTrack.x = tx;

		var percent = Math.round( 100 * (tx - this.imgThumb.x)  / (this.imgThumb.width - this.grpTrack.width) );
		this.lblTrack.text = percent.toString() + "%";

		this.renderCurrentBid(application.customer.gold * percent / 100);
		this.imgFront.width = tx - this.imgThumb.x;	
	}
}