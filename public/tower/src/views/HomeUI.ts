class HomeUI extends AbstractUI{
    private imgBg:eui.Image;

	private imgAvatar: eui.Image;
    private lblGold:eui.Label;
    private lblDiamond: eui.Label;
    private lblOutput: eui.Label;
    private lblName: eui.Label;
    
    private gold: number = 0;
    private diamond: number = 0;
    private output: number = 0;
	
    private grpAddGold: eui.Group;
	private imgAddGold: eui.Image;
	private lblAddGold: eui.Label;

    private imgCharge: eui.Image;

	private imgVip: eui.Image;
	
    private btnGift: eui.Button;
    private imgGift: eui.Image;
    
    private btnReward: eui.Button;
    private imgReward: eui.Image;
    
    private btnHelp: eui.Button;
    
    private btnAddGold: eui.Button;
    private btnAddDiamond: eui.Button;
    
    private imgMessage: eui.Image;
    private imgHasMessage: eui.Image;
    
    constructor( ) {
        super("homeUISkin");
    }

    protected onRefresh():void {
        var self = this;
        
        self.lblAddGold.visible = false;
        self.imgAddGold.visible = false;
        self.lblAddGold.backgroundColor = 0xFFFFFF;
        
        self.imgHit.visible = false;
        self.imgGift.visible = false;
        self.imgReward.visible = false;
        
        self.imgHasMessage.visible = false;
        
        self.imgVip.source = "VIP" + application.me.vip.getLevel().toString() + "_png";

		self.imgAvatar.source = Customer.avatarUrl(application.me.attrs);
        self.renderCustomer();

        self.lblHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onHit();
        }, this);
        self.btnHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onHit();
        }, this);
                
        self.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new GiftUI(), this);
        }, this);
                
        self.btnReward.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new LoginRewardUI(), this);
        }, this);

        self.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
        	HelpUI.showMainHelp();
        }, this);
                
        self.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new BuyToolUI("time", 500));
        }, this);
                
        self.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new ChargeTipUI(), this);
        }, this);

        self.imgCharge.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
			if (application.me.attrs.charge == 0) {
				application.showUI(new FirstChargeBonusUI(), this);
			} else {
				application.showUI(new ChargeTipUI(), this);
			}
        },this);

        self.imgMessage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new MessageUI(),this);
        },this);

        self.imgVip.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new VipUI(),this);
        },this);

        application.dao.addEventListener("Customer",function(ev: egret.Event) {
            this.renderCustomer();
        },this);

        application.dao.addEventListener("Gift",function(ev: egret.Event) {
            this.renderGift();
        },this);

        application.dao.addEventListener("Audit",function(ev: egret.Event) {
            this.renderReward();
        },this);

        application.dao.addEventListener("Message",function(ev: egret.Event) {
            this.renderMessage();
        },this);

		self.renderGiftDynamically();
		self.renderReward();
        
        /// 首次加载完成首先显示home
        self.gotoHome(); 
		
        if (application.guideUI) {
			application.guideUI.setOverCallback(function(){
			 	self.earnGoldDynamically();

                self.refreshMessageTimely();
			});
            
        	this.addChild(application.guideUI);
            application.guideUI.next();
		} else {	
		 	self.earnGoldDynamically();

            self.refreshMessageTimely();
		}
    }
	
	private renderGiftDynamically(): void {
		this.renderGift();
		
		application.stopwatch.addEventListener("hour", function(event:egret.Event){
			this.renderGift();
		}, this);
	}
	
	private renderGift(): void {
		var self = this;
		
        Gift.check(application.me).then(function(gifts){
            self.imgGift.visible = Gift.hasGift(gifts);
        });
	}
	
	private renderReward(): void {
		var self = this;
		
        Audit.check(application.me).then(function(audits){
            self.imgReward.visible = Audit.hasRewards(audits);
        });
	}
	
    private earnGoldDynamically(): void {
		var seconds = 5;
		
		application.stopwatch.addEventListener("second", function(event:egret.Event){
			if (event.data % seconds == 0) {
				this.earnGold(seconds);
			}
		}, this);
    }

	private refreshMessageTimely(): void {
        this.renderMessage();
        
		application.stopwatch.addEventListener("hour", function(event:egret.Event){
            this.renderMessage();
		}, this);	
	}

    private renderMessage(): void {
        var self = this;
        
        self.imgHasMessage.visible = false;
        application.dao.fetch("Message",{ customer_id: application.me.attrs.id,state: 0 },{ limit: 1 }).then(function(messages) {
            if(messages.length == 1) {
                self.imgHasMessage.visible = true;
            }
        });
    }

    private renderOfflineGold(): void {
        if(application.me.attrs.offline_gold > 0) {
            application.showUI(new OfflineGoldUI(), this);
        }
    }

	private earnGold(second:number): void {
		var gold = this.getOutput() * second;
		
        application.me.earnGold(gold);
        
		//显示获得金币的动画
        this.grpAddGold.y = 370;
        this.imgAddGold.visible = true;
        this.lblAddGold.visible = true;
        this.lblAddGold.text = "+" + Utility.format(gold);
		
        var timer: egret.Timer = new egret.Timer(100,20);
        timer.addEventListener(egret.TimerEvent.TIMER,function(event: egret.TimerEvent) {
            this.grpAddGold.y -= 10;
        },this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(event: egret.TimerEvent) {
            this.lblAddGold.visible = false;
            this.imgAddGold.visible = false;
        },this);
        timer.start();
	}

	private getOutput(): number {
		if (this.hit > 0) {
			return application.me.vip.getHit(application.me.attrs.output);
		} else {
			return application.me.attrs.output;
		}
	}
	
	private animateStep(lbl:eui.Label, from:number, to:number): void {
		if (from == to) {
			return;
		}
		
		let step:number = Math.min(Math.abs(from - to), 20);
		var delta = (to - from) / step;
		var timer: egret.Timer = new egret.Timer(50, step);
        timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			lbl.text = Utility.format(Math.round(from + delta * (<egret.Timer>event.target).currentCount));
		}, this);
		
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function(event:egret.TimerEvent){
			lbl.text = Utility.format(to);
		}, this);

        timer.start();
	}
	
    public renderCustomer():void {
        if(this.gold != application.me.usableGold()) {
        	this.animateStep(this.lblGold, this.gold, application.me.usableGold());
            
            this.gold = application.me.usableGold();
		}
		
        if(this.diamond != application.me.attrs.diamond) {
        	this.animateStep(this.lblDiamond, this.diamond, application.me.attrs.diamond);
            
            this.diamond = application.me.attrs.diamond;
		}
		
        if(this.output != this.getOutput()) {
        	this.animateStep(this.lblOutput, this.output, this.getOutput());
            
            this.output = this.getOutput();
		}

        if (application.me.attrs.charge > 0) {
        	this.imgCharge.source = "charge_png";
        }
        
        this.lblName.text = application.me.attrs.name;
	}
}
