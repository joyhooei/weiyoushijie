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
			self.onGift();
        }, this);
                
        self.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onHelp();
        }, this);

        self.imgCharge.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            self.onCharge();
        },this);
        
        /// 首次加载完成首先显示home
        self.goHome(); 
		
		self.renderOfflineGold();
    }
    
    private onCharge():void {
		if (application.customer.charge == 0) {
			var ui = new FirstChargeBonusUI();
		 	ui.horizontalCenter = 0;
		 	ui.verticalCenter = 0;
		 	this.addChild(ui);
		} else {
			application.charge();
		}
    }
	
	private onGift(): void {
        var ui = new GiftUI();
        ui.horizontalCenter = 0;
        ui.verticalCenter = 0;
        this.addChild(ui);    	
	}
	
	private onHelp(): void {
        var ui = new HelpUI();
        ui.horizontalCenter = 0;
        ui.verticalCenter = 0;
        this.addChild(ui);    	
	}
    
    private renderTotalHits(): void {
    	var self = this;
		
		var timer: egret.Timer = new egret.Timer(1000 * 60 * 60 * 4, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			application.dao.rest("hits", {customer_id: application.customer.id}, function(succeed, result) {
			 	if (succeed && result.total_hits > 0) {
				 	application.customer.total_hits = result.hits;
				 	self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
			 	}
		 	});	
		}, this);

		timer.start();
    }
	
	//中午12点需要刷新拍卖数据
	private refreshBid(): void {
    	var self = this;
		
		var timer: egret.Timer = new egret.Timer(1000 * 60, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			var dt = new Date();
			if (dt.getHours() == 12) {
				self.renderBid();
				
				application.refreshBid(function(bid){
					if (bid) {
						self.refresh(0 - bid.gold, 0, 0, 0, null);
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
                application.dao.fetch("Customer",{ id: bids[0].customer_id },{ limit: 1 },function(succeed, customers) {
                    if(succeed && customers.length > 0) {
                        self.lblBidName.text = customers[0].name;
                        self.lblBidGold.text = application.format(bids[0].gold);
						self.imgBidAvatar.source = customers[0].avatar;
                    }
                });
            }
        })
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
        self.addChild(self.mcBeauty);
		
        self.mcBeauty.touchEnabled = true;
        self.mcBeauty.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onBeauty();
        },this);
	}
    
    private renderOfflineGold(): void {
        if(application.customer.offline_gold > 0) {
    		var ogui = new OfflineGoldUI(application.customer.offline_gold, application.customer.offline_hours.toString(), application.customer.offline_minutes.toString());
    	 	ogui.horizontalCenter = 0;
    	 	ogui.verticalCenter = 0;
            this.addChild(ogui);
        }
    }
	
	private onBeauty(): void {
		var self = this;
		
		self.mcBeauty.play(3);

		application.customer.gold += self.getOutput();
		application.dao.save("Customer", application.customer, null);

		self.animateStep(self.lblGold,application.customer.gold + application.customer.output,application.customer.gold);
	}
	
	private onHit(): void {
		var self = this;
		
		if (application.customer.total_hits > 0) {
            application.customer.total_hits -= 1;
            application.dao.save("Customer",application.customer,null);
            
            self.lblTotalHits.text = "x" + application.customer.total_hits.toString();
            
    		self.hit = 59;
    		self.lblOutput.text = application.format(self.getOutput());
    
    		var timer: egret.Timer = new egret.Timer(1000, 60);
    		timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
    			self.lblHit.text = self.hit.toString();
    
    			self.hit = self.hit - 1;
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
        	if (application.bid) {
        		this.animateStep(this.lblGold, application.customer.gold - application.bid.gold - goldAdded, application.customer.gold - application.bid.gold);
			} else {
        		this.animateStep(this.lblGold, application.customer.gold - goldAdded, application.customer.gold);
			}
		}
		
		if (diamondAdded != 0) {
        	this.animateStep(this.lblDiamond, application.customer.diamond - diamondAdded, application.customer.diamond);
		}
		
		if (outputAdded != 0) {
        	this.animateStep(this.lblOutput, this.getOutput() - outputAdded, this.getOutput());
		}
		
        this.lblTotalHits.text = totalHits.toString();
        
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
    
    private resetFocus():void{
        if( this._uiFocused ){
            if( this._uiFocused.parent ){
                this._uiFocused.parent.removeChild( this._uiFocused );
            }
            this._uiFocused = null;
        }
        
        if( this._btnFocused != null ){
            this._btnFocused.selected = false;
            this._btnFocused.enabled = true;
            this._btnFocused = null;
        }
    }
    
    private goHome():void{
        this._pageFocusedPrev = this._pageFocused = GamePages.HOME;
        this._btnFocused = this.btnHome;
        this.btnHome.selected = true;
    }
    
    private goTool():void {
		if( !this._toolUI ){
			this._toolUI = new ToolUI();
			this._toolUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
				this.resetFocus();
				this.goHome();
			}, this );
		}
		
		this._uiFocused = this._toolUI;
        this.btnTool.selected = true;
    }
    
    private goRank():void {
		if( !this._rankUI ){
			this._rankUI = new RankUI();
			this._rankUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
				this.resetFocus();
				this.goHome();
			}, this );
		}
		
		this._uiFocused = this._rankUI;	
        this.btnRank.selected = true;
    }
    
    private goAuction():void {
		if( !this._auctionUI ){
			this._auctionUI = new AuctionUI();
			this._auctionUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
				this.resetFocus();
				this.goHome();
			}, this );
		} else {
            this._auctionUI.refresh();
		}
		
		this._uiFocused = this._auctionUI;	
        this.btnAuction.selected = true;
    }
    
    private btnHandler( evt:egret.TouchEvent ):void{
        /// 已经选中不应当再处理!
        if( evt.currentTarget == this._btnFocused ) {
            this._btnFocused.selected = true;
            return;
        }
        
        /// 逻辑生效，所有按钮锁定
        for( var i:number = this.btns.length - 1; i > -1; --i ){
            this.btns[i].enabled = false;
        }

        /// 移除上一焦点对应的按钮
        if( this._btnFocused ){
            this._btnFocused.selected = false;
            this._btnFocused.enabled = true;
        }
        
        /// 移除上一焦点对应的UI
        if( this._uiFocused && this._uiFocused.parent ){
            this._uiFocused.parent.removeChild( this._uiFocused );
        }
        
        /// 设置当前焦点按钮
        this._btnFocused = evt.currentTarget;
        this._btnFocused.selected = true;
        
        /// 焦点UI重置
        this._uiFocused = null;

        this._pageFocusedPrev = this._pageFocused;
        switch ( this._btnFocused ){
            case this.btnHome:
                this._pageFocused = GamePages.HOME;
                break;
                
            case this.btnRank:
                this._pageFocused = GamePages.RANK ;
                break;
                
            case this.btnTool:
                this._pageFocused = GamePages.TOOL ;
                break;
                
            case this.btnAuction:
                this._pageFocused = GamePages.AUCTION ;
                break;
        }
        
        this.dispatchEventWith( GameEvents.EVT_LOAD_PAGE, false, this._pageFocused );
    }

    public pageReadyHandler( pageName:String ):void {
        /// 页面加载完成，所有非焦点按钮解锁
        for( var i:number = 0; i < this.btns.length; i++ ){
            this.btns[i].enabled = true;
        }
        
        switch ( pageName ){
            case GamePages.HOME:
                this.goHome();
                break;
                
            case GamePages.RANK:
                this.goRank();
                break;
                
            case GamePages.TOOL:
				this.goTool();
                break;
                
            case GamePages.AUCTION:
				this.goAuction();
                break;
        }
        
        this.addChild( this._uiFocused);
    }
}
