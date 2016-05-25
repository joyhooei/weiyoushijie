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
    
    private grpProject: eui.List;
    private projectItems: ProjectItem[];
    
    private mcBeauty: egret.MovieClip;
    
	private imgAvatar: eui.Image;
    private lblGold:eui.Label;
    private lblDiamond: eui.Label;
    
	private imgBidAvatar:eui.Image;
    private lblBidName:eui.Label;
    private lblBidGold:eui.Label;
    
    private lblOutput: eui.Label;
    
    private imgCharge: eui.Image;
    private btnHit: eui.Button;
    private lblHit: eui.Label;
    private lblTotalHits: eui.Label;
	private hit: number = 0;
	
    private btnGift: eui.Button;
    private btnHelp: eui.Button;
    
    private btnAddGold: eui.Button;
    private btnAddDiamond: eui.Button;
    
    constructor( ) {
        super();
		
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/homeUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;
        
        self.btnHome.addEventListener( egret.TouchEvent.TOUCH_TAP, self.btnHandler, self );
        self.btnRank.addEventListener( egret.TouchEvent.TOUCH_TAP, self.btnHandler, self );
        self.btnTool.addEventListener( egret.TouchEvent.TOUCH_TAP, self.btnHandler, self );
        self.btnAuction.addEventListener( egret.TouchEvent.TOUCH_TAP, self.btnHandler, self );
        
        self.btns = [self.btnHome,self.btnRank,self.btnTool,self.btnAuction ];
        
		self.imgAvatar.source = application.customer.avatar;
        self.refresh(application.customer.gold, application.customer.diamond, application.customer.output, 0, null);
        
		self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
        self.renderTotalHits();
            
        self.renderProjects();
		
		self.renderBid();
        
		self.renderBeauty();
        
        self.lblHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onHit();
        }, this);
        self.btnHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onHit();
        }, this);
                
        self.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new GiftUI());
        }, this);
                
        self.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showHelp("");
        }, this);
                
        self.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.showUI(new BuyToolUI("time", 500));
        }, this);
                
        self.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.charge();
        }, this);

        self.imgCharge.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
			if (application.customer.charge == 0) {
				application.showUI(new FirstChargeBonusUI());
			} else {
				application.charge();
			}
        },this);
        
        /// 首次加载完成首先显示home
        self.gotoHome(); 
		
		self.renderOfflineGold();
		
		self.earnGoldDynamically();
		
		self.refreshBidAtNoon();
    }
    
    private earnGoldDynamically(): void {
		var seconds = 5;
		
		var timer: egret.Timer = new egret.Timer(seconds * 1000, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			this.earnGold(seconds);
		}, this);

		timer.start();    
    }
    
    private renderTotalHits(): void {
    	var self = this;
		
		var timer: egret.Timer = new egret.Timer(1000 * 60 * 60 * 4, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			application.dao.rest("hits", {customer_id: application.customer.id}, function(succeed, result) {
			 	if (succeed) {
				 	application.customer.total_hits = result.hits;
				 	self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
			 	}
		 	});	
		}, this);

		timer.start();
    }
	
	//中午12点需要刷新拍卖数据
	private refreshBidAtNoon(): void {
    	var self = this;
		
		var timer: egret.Timer = new egret.Timer(1000 * 60, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			var dt = new Date();
			if (dt.getHours() == 12 && dt.getMiniutes() == 0) {
				self.renderBid();
				
				application.refreshBid(function(bid){
					if (bid) {
						self.refresh(0 - bid.gold, 0, 0, 0, null);
					} else {
                    	self.refresh(0, 0, 0, 0, null);
                    }
				});
			}
		}, this);

		timer.start();
	}
	
	private renderBid(): void {
		var self = this;
		
        application.dao.fetch("Bid",{ succeed: 1}, {limit : 1, order :'create_time desc'}, function(succeed, bids){
            if (succeed && bids.length > 0) {
				if (application.customer.id == bids[0].customer_id) {
					var bidDay = application.bidDay();
					if (application.customer.win_day != bidDay) {
						application.customer.win_day = bidDay;
						application.showUI(new WinUI());
					}
					
					self.renderBidCustomer(application.customer, bids[0]);
				} else {
					application.dao.fetch("Customer",{ id: bids[0].customer_id },{ limit: 1 },function(succeed, customers) {
						if(succeed && customers.length > 0) {
							self.renderBidCustomer(customers[0], bids[0]);
						}
					});
				}
            }
        })
	}
	
	private renderBidCustomer(customer:any, bid:any) {
		this.lblBidName.text = customer.name;
		this.lblBidGold.text = application.format(bid.gold);

		if (customer.hide_winner == 1) {
			this.imgBidAvatar.source = "Ahide_png";
		} else {
			this.imgBidAvatar.source = customer.avatar;
		}
	}
	
	private renderProjects(): void {
		var self = this;
		
        self.projectItems = new Array<ProjectItem>();
		
        self.grpProject.removeChildren();
        application.dao.fetch("Project",{ customer_id: application.customer.id },{ order: 'sequence asc' },function(succeed, projects) {
            if(succeed && projects.length > 0) {
                for(var i = 0; i < projects.length; i ++){                    
                    self.renderProject(projects[i]);
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
        self.addChildAt(self.mcBeauty, 1);
		
        self.mcBeauty.touchEnabled = true;
        self.mcBeauty.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onBeauty();
        },this);
	}
    
    private renderOfflineGold(): void {
        if(application.customer.offline_gold > 0) {
			var ui = new OfflineGoldUI(application.customer.offline_gold, application.customer.offline_hours.toString(), application.customer.offline_minutes.toString());
            ui.horizontalCenter = 0;
            ui.verticalCenter = 0;
            this.addChild(ui); 
        }
    }
	
	private onBeauty(): void {
		this.mcBeauty.play(3);
		this.earnGold(1);
	}
	
	private earnGold(second:number): void {
		var gold = this.getOutput() * second;
		
		application.customer.gold += gold;
		this.animateStep(this.lblGold, application.usableGold() - gold, application.usableGold());
		
		application.dao.save("Customer", application.customer, null);
	}
	
	private onHit(): void {
		var self = this;
        
        if (self.hit > 0) {
        	return;
		}
		
		if (application.customer.total_hits > 0) {
            application.customer.total_hits -= 1;
            application.dao.save("Customer",application.customer,null);
            
            self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
            
    		self.hit = 59;
    		self.lblOutput.text = application.format(self.getOutput());
    
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
    			self.lblOutput.text = application.format(application.customer.output.toString());
    		}, this);
    		
    		timer.start();
    	} else {
    	    Toast.launch("暂时没有奋力一击");
    	}
	}
	
	private getOutput(): number {
		if (this.hit > 0) {
			return application.customer.output * 99;
		} else {
			return application.customer.output;
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
			lbl.text = application.format(Math.round(from + delta * (<egret.Timer>event.target).currentCount));
		}, this);
		
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function(event:egret.TimerEvent){
			lbl.text = application.format(to);
		}, this);

        timer.start();
	}
	
    public refresh(goldAdded: number,diamondAdded: number,outputAdded: number,totalHits:number, projEdited:any):void {
		if (goldAdded != 0) {
        	this.animateStep(this.lblGold, application.usableGold() - goldAdded, application.usableGold());
		}
		
		if (diamondAdded != 0) {
        	this.animateStep(this.lblDiamond, application.customer.diamond - diamondAdded, application.customer.diamond);
		}
		
		if (outputAdded != 0) {
        	this.animateStep(this.lblOutput, this.getOutput() - outputAdded, this.getOutput());
		}
		
        if(totalHits != 0) {
            this.lblTotalHits.text = "x" + totalHits.toString();
        }
        
        if (application.customer.charge > 0) {
        	this.imgCharge.source = "charge_png";
        }
        
		this.renderProject(projEdited);
	}
	
	private renderProject(proj) {
		if (proj) {
            let i = proj.sequence;
            
            if(i < this.projectItems.length) {
		  		this.projectItems[i].refresh(proj);
		 	} else {
				let item: ProjectItem = new ProjectItem(proj, application.projects[i], (i + 1).toString() + "_png", "t" + (i + 1).toString() + "_png");
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
			this.addChild(this._uiFocused);         
        }
	}
	
	private loadPage(): void {
		this.enableFooter(false);
		
		this.dispatchEventWith( GameEvents.EVT_LOAD_PAGE, false, this._pageFocused);
	}

    public pageReadyHandler( pageName:string ):void {
        this.enableFooter(true);
		
		this.gotoPage(pageName, true);
		
        this.addChild( this._uiFocused);
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
