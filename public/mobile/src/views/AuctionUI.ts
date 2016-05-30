class AuctionUI extends eui.Component{
    private imgBack: eui.Image;

	private lblGold:eui.Label;
    private lblDiamond: eui.Label;
	
	private lblLastBid:eui.Label;
	private lblMaxBid:eui.Label;
	private lblCurrentBid:eui.Label;
	
	private imgBid:eui.Image;
	
	private grpTrack: eui.Group;
	private lblTrack: eui.Label;
	private imgFront: eui.Image;
	private imgThumb: eui.Image;
	
    private btnAddGold: eui.Button;
    private btnAddDiamond: eui.Button;
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
		this.lblGold.text = application.format(application.customer.gold);
        this.lblDiamond.text = application.format(application.customer.diamond);
		
        var today = application.bidDay();
		this.renderLastBid(today);
		this.renderMaxBid(today);	
		
        this.grpTrack.x = this.imgThumb.x;
        this.lblTrack.text = "0%";
		
        this.imgFront.x = this.imgThumb.x;	
        this.imgFront.y = this.imgThumb.y;	
        this.imgFront.width = 0;
		
		this.addGold = 0;
		this.bid = { gold: 0,day: today,customer_id: application.customer.id,succeed: 0 };
        this.renderBid(0);
    }

    private uiCompHandler():void {
		this.refresh();
		
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.gotoHome();
        },this);

        this.imgBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBid, this);
		
		this.grpTrack.touchEnabled = true;
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginChangeBid , this);
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onChangeBid,this);
		
        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new BuyToolUI("time", 500));
        }, this);
                
        this.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.charge();
        }, this);
                
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			var content = "1. 每天中午12点拍卖结束。\n";
			content += "2. 出价最高者成为今日头条，获得1枚勋章和2000个钻石的奖励。\n";
			content += "3. 未中标玩家的拍卖金币自动返还。\n";
			content += "4. 拍卖期间，系统自动显示截至上个小时的最高出价，为新出价的玩家提供参考。\n";
			content += "5. 玩家在拍卖结束前可以反复加价，每次加价最高为当前拥有的所有金币。\n";
			content += "6. 每天首次参加拍卖可以在礼物页面中领取100钻石奖励。\n";
			application.showHelp(content);
        }, this);
    }
	
	private renderLastBid(today:string): void {
		var self = this;
		
        application.dao.fetch("Bid",{ succeed: 0, day :today, customer_id: application.customer.id}, {limit : 1}, function(succeed, bids){
            if (succeed && bids.length > 0) {
				self.bid = bids[0];
				self.renderBid(self.addGold);
			}
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
	
	private renderBid(gold: number): void {
		this.addGold = gold;
		
		this.lblCurrentBid.text = application.format(this.addGold);
		this.lblLastBid.text = application.format(this.addGold + this.bid.gold);
	}
	
	private onBid(): void {
		var self = this;

		self.bid.gold += self.addGold;
		application.dao.save("Bid", self.bid, function(succeed, bid){
			if (succeed) {
				Toast.launch("投标成功");

				application.bid = self.bid;				
				application.refreshCustomer(0 - self.addGold, 0, 0, 0, null);

				self.back();
			} else {
				Toast.launch("投标失败，请稍后再试");
			}
		});
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

		this.renderBid((application.customer.gold - this.bid.gold) * percent / 100);
        this.imgFront.width = this.grpTrack.x - this.imgThumb.x + 20;
	}
}