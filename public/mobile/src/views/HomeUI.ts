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
    
    private mcBeauty: egret.MovieClip;
    
	private imgAvatar: eui.Image;
    private lblGold:eui.Label;
    private lblDiamond: eui.Label;
    
	private imgBidAvatar:eui.Image;
    private lblBidName:eui.Label;
    private lblBidGold:eui.Label;
    
    private lblOutput: eui.Label;
    
    private imgHit: eui.Image;
    private lblHit: eui.Label;
	private hit: number = 0;
	
	private imgGift: eui.Image;
	private imgHelp: eui.Image;
    
    private projectTitles: string[] = ["测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试","测试"];
    
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
        self.animateCustomer(0 - application.customer.gold, 0 - application.customer.diamond, application.customer.output, null);
            
        self.renderProjects();
		
		self.renderBid();
        
		self.renderBeauty();
        
        self.lblHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onHit();
        }, this);
        self.imgHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onHit();
        }, this);
                
        self.imgGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onGift();
        }, this);
                
        self.imgHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onHelp();
        }, this);
                
        /// 首次加载完成首先显示home
        self.goHome(); 
    }
	
	private onGift(): void {
	}
	
	private onHelp(): void {
	}
	
	private renderBid(): void {
		var self = this;
		
        application.dao.fetch("Bid",{ succeed: 1}, {limit : 1, order :'create_time desc'}, function(succeed, bids){
            if (succeed && bids.length > 0) {
                application.dao.fetch("Customer",{ id: bids[0].customer_id },{ limit: 1 },function(succeed, customers) {
                    if(succeed && customers.length > 0) {
                        self.lblBidName.text = customers[0].name;
                        self.lblBidGold.text = bids[0].gold;
						self.imgBidAvatar.source = customers[0].avatar;
                    }
                });
            }
        })        
	}
	
	private renderProjects(): void {
		var self = this;
		
        self.grpProject.removeChildren();
        application.dao.fetch("Project",{ customer_id: application.customer.id },{ order: 'sequence asc' },function(succeed, projects) {
            if(succeed && projects.length > 0) {
                for(var i = 0; i < projects.length; i ++){                    
                    self.addProject(projects[i]);
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
        self.mcBeauty.x = 60; 
        self.mcBeauty.y = 90; 
        self.addChild(self.mcBeauty);
		
        self.mcBeauty.touchEnabled = true;
        self.mcBeauty.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			self.onBeauty();
        },this);
	}
    
    private renderOfflineGold(): void {
    	var self = this;
		
		application.dao.rest("offline_gold", {customer_id: application.customer.id}, function(succeed, result) {
			if (succeed && result.gold > 0) {
				var message = "离线" + result.hours.toString() + "小时" + result.minutes.toString() + "分钟，" + "共产生金币收益" + result.gold.toString();
				Toast.launch(message);
                
                application.customer.gold += result.gold;
                application.dao.save(application.customer, null);
                
                self.animateStep(self.lblGold, application.customer.gold - result.gold, application.customer.gold);
			}
		});
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
		
		self.hit = 59;
		self.lblOutput.text = self.getOutput().toString();

		var timer: egret.Timer = new egret.Timer(1000, 60);
		timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			self.lblHit.text = self.hit.toString();

			self.hit = self.hit - 1;
		}, this);

		timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function(event:egret.TimerEvent){
			self.hit = 0;
			self.lblHit.text = "59";
			self.lblOutput.text = application.customer.output.toString()
		}, this);
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
			lbl.text = Math.round(from + delta * (<egret.Timer>event.target).currentCount).toString();
		}, this);
		
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function(event:egret.TimerEvent){
			lbl.text = to.toString();
		}, this);

        timer.start();
	}
	
	public animateCustomer(gold:number, diamond:number, output:number, proj:any):void {
        this.animateStep(this.lblGold,    application.customer.gold + gold, application.customer.gold);
        this.animateStep(this.lblDiamond, application.customer.diamond + diamond, application.customer.diamond);
        this.animateStep(this.lblOutput,  this.getOutput() - output, this.getOutput());
        
        this.addProject(proj);
	}
	
	private addProject(proj) {
    	if (proj) {
            let i = proj.sequence;
            let item: ProjectItem = new ProjectItem(proj,application.projects[i],"pro" + (i + 1).toString() + "_png",this.projectTitles[i]);
            this.grpProject.addChildAt(item,i);
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
        this.imgBg.source = "MPB_png";
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
    }
    
    private goAuction():void {
		if( !this._auctionUI ){
			this._auctionUI = new AuctionUI();
			this._auctionUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
				this.resetFocus();
				this.goHome();
			}, this );
		}
		
		this._uiFocused = this._auctionUI;	
    }
    
    private btnHandler( evt:egret.TouchEvent ):void{
        /// 已经选中不应当再处理!
        if( evt.currentTarget == this._btnFocused ) {
            console.log( evt.currentTarget.name, "已经选中不应当再处理!" );
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
        this._btnFocused.enabled = false;
        
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
        for( var i:number = this.btns.length - 1; i > -1; --i ){
            this.btns[i].enabled = ! this.btns[i].selected;
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
        
        /// 总是把页面放在背景的上一层！
        this.addChildAt( this._uiFocused, this.getChildIndex( this.imgBg ) + 1 );
    }
}
