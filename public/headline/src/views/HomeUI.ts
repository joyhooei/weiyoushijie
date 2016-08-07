class HomeUI extends eui.Component{
    //footer buttons
    private btnHome: eui.ToggleButton;
    private btnRank: eui.ToggleButton;
    private btnTool: eui.ToggleButton;
    private btnAuction: eui.ToggleButton;
    private _btnFocused:eui.ToggleButton;
    private btns: eui.ToggleButton[];
    
    private _pageFocusedPrev:string;
    private _pageFocused:string;
    
    private _rankUI:RankUI;
    private _toolUI:ToolUI;
    private _auctionUI:AuctionUI;
    private _uiFocused:eui.Component;
    
    private imgBg:eui.Image;
    
    private grpProject: eui.Group;
    private projectItems: ProjectItem[];
    
    private mcBeauty: egret.MovieClip;
    
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
    
	private bid: any;
	private imgBidAvatar:eui.Image;
    private lblBidName:eui.Label;
    private lblBidGold:eui.Label;
        
    private imgCharge: eui.Image;
    
    private btnHit: eui.Button;
    private lblHit: eui.Label;
    private lblTotalHits: eui.Label;
    private imgHit: eui.Image;
	private hit: number = 0;
	
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
    
    private imgStar: eui.Image;
    
    constructor( ) {
        super();
		
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/homeUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;
        
        self.lblAddGold.visible = false;
        self.imgAddGold.visible = false;
        self.lblAddGold.backgroundColor = 0xFFFFFF;
        
        self.imgHit.visible = false;
        self.imgGift.visible = false;
        self.imgReward.visible = false;
        
        self.imgHasMessage.visible = false;
        
        self.imgVip.source = "VIP" + application.me.vip.getLevel().toString() + "_png";
        
        self.btnHome.addEventListener( egret.TouchEvent.TOUCH_TAP, self.btnHandler, self );
        self.btnRank.addEventListener( egret.TouchEvent.TOUCH_TAP, self.btnHandler, self );
        self.btnTool.addEventListener( egret.TouchEvent.TOUCH_TAP, self.btnHandler, self );
        self.btnAuction.addEventListener( egret.TouchEvent.TOUCH_TAP, self.btnHandler, self );
        
        self.btns = [self.btnHome,self.btnRank,self.btnTool,self.btnAuction ];
        
		self.imgAvatar.source = Customer.avatarUrl(application.me.attrs);
        self.renderCustomer();
        
		self.lblTotalHits.text = "x" + application.me.attrs.total_hits.toString();
        self.renderTotalHits();
            
        self.renderProjects();
        
		self.renderBeauty();
        
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

        self.imgStar.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new StarUI(),this);
        },this);

        application.dao.addEventListener("Project",function(ev: egret.Event) {
            var myProject = ev.data;
            this.renderProject(myProject);
        },this);

        application.dao.addEventListener("Customer",function(ev: egret.Event) {
            this.renderCustomer();
        },this);

        application.dao.addEventListener("Bid",function(ev: egret.Event) {
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

				self.renderBid();

			 	self.refreshBidAtNoon();
				
                self.refreshMessageTimely();
			});
            
        	this.addChild(application.guideUI);
            application.guideUI.next();
		} else {	
		 	self.earnGoldDynamically();

			self.renderBid();
			
		 	self.refreshBidAtNoon();
			
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
    
    private renderTotalHits(): void {
    	var self = this;
		
        application.stopwatch.addEventListener("hour", function(event:egret.Event){
        	if (event.data % 4 == 0) {
			 	application.dao.rest("hits", {customer_id: application.me.attrs.id}).then(function(result) {
				 	application.me.attrs.total_hits = result.hits;
				 	self.lblTotalHits.text = "x" + application.me.attrs.total_hits.toString();
			 	});				
			}
        }, this);
    }
	
	//中午12点需要刷新拍卖数据
	private refreshBidAtNoon(): void {
    	var self = this;
		
		application.stopwatch.addEventListener("minute", function(event:egret.Event){
        	var bidDay = Bid.day();
			
			//如果bidday已经过期了，则重新刷新bid数据
			if (!(self.bid && bidDay == self.bid.day)) {
				self.renderBid();
			}
            
            if (!(application.me.bid.attrs && bidDay == application.me.bid.attrs.day)) {
				application.me.bid.refresh(application.me).then(function(bid){
                    self.renderCustomer();
				});
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
    
	private renderBid(): void {
		var self = this;
		
        application.dao.fetch("Bid",{ succeed: 1}, {limit : 1, order :'create_time desc'}).then(function(bids){
            if (bids.length > 0 && !(self.bid && self.bid.id == bids[0].id)) {
				self.bid = bids[0];
				
				//如果显示win ui，则不显示offlinegold ui，否则显示offlinegold ui
				if (application.me.attrs.id == self.bid.customer_id) {
					//已经显示过，就不需要再显示了
					if (self.bid.claimed == 0) {
						application.showUI(new WinUI(self.bid), self);
                        
                        application.me.earnOfflineGold();
					} else {
                    	self.renderOfflineGold();
                        
                        Bid.earn(application.me);
                    }
					
					self.renderBidCustomer(application.me.attrs);
				} else {
					application.dao.fetch("Customer",{ id: self.bid.customer_id },{ limit: 1 }).then(function(customers) {
						if(customers.length > 0) {
							self.renderBidCustomer(customers[0]);
						}
					});
					
					self.renderOfflineGold();
                    
                    Bid.earn(application.me);
				}
            }
        })
	}
    
    private renderOfflineGold(): void {
        if(application.me.attrs.offline_gold > 0) {
            application.showUI(new OfflineGoldUI(), this);
        }
    }
	
	private renderBidCustomer(customer:any) {
		this.lblBidName.text = customer.name;
		this.lblBidGold.text = Utility.format(this.bid.gold);

		if (customer.hide_winner == 1) {
			this.imgBidAvatar.source = "Ahide_png";
		} else {
            this.imgBidAvatar.source = Customer.avatarUrl(customer);
        }
	}
	
	private renderProjects(): void {
		var self = this;
		
        self.projectItems = new Array<ProjectItem>();
		
        self.grpProject.removeChildren();
        application.dao.fetch("Project",{ customer_id: application.me.attrs.id },{ order: 'sequence asc' }).then(function(projects) {
            if(projects.length > 0) {
              	var output = 1;
                for(var i = 0; i < projects.length; i ++){
					var p = projects[i];
					
                    self.renderProject(p);
                    
                    if (p.unlocked == 0) {
                    	output += application.projects[p.sequence].output(p.level, p.achieve, p.tool_ratio);
					}
                }
				output = application.me.vip.getOutput(output);
                
				if (output != application.me.attrs.output) {
					application.me.attrs.output = output;
					application.me.saveNow();
					
					self.lblOutput.text = Utility.format(self.getOutput());
				}
            }
        });
	}
	
	private renderBeauty(): void {
		var self = this;
		
        var data = RES.getRes("animation_json");
        var txtr = RES.getRes("animation_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
		
        self.mcBeauty = new egret.MovieClip( mcFactory.generateMovieClipData("" ) );
        self.mcBeauty.x = 70; 
        self.mcBeauty.y = 90; 
        self.addChildAt(self.mcBeauty, 3);
		
        self.mcBeauty.touchEnabled = true;
        self.mcBeauty.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onBeauty();
        },this);
	}
	
	private onBeauty(): void {
		this.mcBeauty.play(3);
		this.earnGold(1);
		
		if (application.guideUI) {
		    application.guideUI.next();
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
	
	private onHit(): void {
		var self = this;
        
        if (self.hit > 0) {
        	return;
		}
		
		if (application.me.attrs.total_hits > 0) {
            application.me.attrs.total_hits -= 1;
            application.me.saveNow();
            
            self.lblTotalHits.text = "x" + application.me.attrs.total_hits.toString();
            
    		self.hit = 59;
    		self.lblOutput.text = Utility.format(self.getOutput());
            
            Toast.launch("获得" + application.me.vip.getHitRatio() + "倍收益，持续60秒");
            
            self.imgHit.visible = true;
            
    		var timer: egret.Timer = new egret.Timer(1000, 59);
    		timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
    			self.lblHit.text = self.hit.toString();
    
				if (self.hit > 0) {
    				self.hit = self.hit - 1;
				}
    		}, this);   
    		timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function(event:egret.TimerEvent){
    			self.hit = 0;
    			self.lblHit.text = "59";
    			self.lblOutput.text = Utility.format(self.getOutput());
                
                self.imgHit.visible = false;
    		}, this);
    		timer.start();
    	} else {
    	    application.showUI(new BuyToolUI("hit", 100), this);
    	}
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
		
        this.lblTotalHits.text = "x" + application.me.attrs.total_hits.toString();
        
        if (application.me.attrs.charge > 0) {
        	this.imgCharge.source = "charge_png";
        }
        
        this.lblName.text = application.me.attrs.name;
	}
	
	private renderProject(proj) {
		if (proj) {
            let i = proj.sequence;
            
            if(i >= this.projectItems.length) {
				let item: ProjectItem = new ProjectItem(proj, application.projects[i]);
                this.projectItems[i] = item;
				this.grpProject.addChildAt(item,i);
		 	}
		}
	}
    
    private gotoHome():void{
		this._uiFocused   = null;
		this.selectFooter(this.btnHome);
    }
    
    private gotoTool():void {
		if( !this._toolUI ){
			this._toolUI = new ToolUI();
			this._toolUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
				this.gotoPage(GamePages.HOME, true);
			}, this );
		} else {
            this._toolUI.refresh();
		}
		
		this._uiFocused = this._toolUI;		
		this.selectFooter(this.btnTool);
    }
    
    private gotoRank():void {
		if( !this._rankUI ){
			this._rankUI = new RankUI();
			this._rankUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
				this.gotoPage(GamePages.HOME, true);
			}, this );
		} else {
            this._rankUI.refresh();
		}
		
		this._uiFocused = this._rankUI;	
		this.selectFooter(this.btnRank);
    }
    
    private gotoAuction():void {
		if( !this._auctionUI ){
			this._auctionUI = new AuctionUI();
			this._auctionUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
				this.gotoPage(GamePages.HOME, true);
			}, this );
		} else {
            this._auctionUI.refresh();
		}
		
		this._uiFocused = this._auctionUI;	
		this.selectFooter(this.btnAuction);
		
        if(application.guideUI) {
            application.guideUI.next();
        }		
    }
    
    private btnHandler( evt:egret.TouchEvent ):void{
        /// 已经选中不应当再处理!
        if( evt.currentTarget == this._btnFocused ) {
            this._btnFocused.selected = true;
            return;
        }

        switch ( evt.currentTarget ){
            case this.btnHome:
                this.gotoPage(GamePages.HOME, true);
                break;
                
            case this.btnRank:
				this.gotoPage(GamePages.RANK, false);
                break;
                
            case this.btnTool:
                this.gotoPage(GamePages.TOOL, false);
                break;
                
            case this.btnAuction:
                this.gotoPage(GamePages.AUCTION, false);
                break;
        }
    }
    
    private resetFocus():void{
        if( this._uiFocused ){
            if( this._uiFocused.parent ){
                this._uiFocused.parent.removeChild( this._uiFocused );
            }
            this._uiFocused = null;
        }
        
        if( this._btnFocused ){
            this._btnFocused.selected = false;
            this._btnFocused.enabled = true;
            this._btnFocused = null;
        }
    }
	
	public gotoPage(pageName:string, pageReady:boolean) {
        this._pageFocused = pageName;
        
        this.resetFocus();
		
        switch ( pageName ){
            case GamePages.HOME:
                this.gotoHome();
                return;
                
            case GamePages.RANK:
				if( this._rankUI || pageReady){
                	this.gotoRank();
				} else {
					this.loadPage();
				}
                break;
                
            case GamePages.TOOL:
				if( this._toolUI || pageReady ){
                	this.gotoTool();
				} else {
					this.loadPage();
				}
                break;
                
            case GamePages.AUCTION:
				if( this._auctionUI || pageReady ){
                	this.gotoAuction();
				} else {
					this.loadPage();
				}
                break;
        }
        
        if (this._uiFocused) {
			this._uiFocused.horizontalCenter = 0;
			this._uiFocused.verticalCenter   = 0;
            
        
			if (application.guideUI) {
				this.addChildAt(this._uiFocused, this.getChildIndex(application.guideUI));
			} else {              
				this.addChild(this._uiFocused);
			}
        }
	}
	
	private loadPage(): void {
		this.enableFooter(false);
		
		this.dispatchEventWith( GameEvents.EVT_LOAD_PAGE, false, this._pageFocused);
	}

    public pageReadyHandler( pageName:string ):void {
        this.enableFooter(true);
		
		this.gotoPage(pageName, true);
    }
	
	private selectFooter(btn:eui.ToggleButton): void {
		if (this._btnFocused) {
			this._btnFocused.selected = false;
		}
		
        this._btnFocused = btn;
		this._btnFocused.selected = true;
	}
	
	private enableFooter(enabled:boolean) : void {
        for( var i:number = 0; i < this.btns.length; i++ ){
            this.btns[i].enabled = enabled;
        }
	}
}
