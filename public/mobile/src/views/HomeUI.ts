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
    
    private lblGold:eui.Label;
    private lblDiamond: eui.Label;
    
    private lblBidName:eui.Label;
    private lblBidGold:eui.Label;
    
    private lblOutput: eui.Label;
    
    constructor( ) {
        super();

        this.addEventListener( GameEvents.EVT_REFRESH_CUSTOMER, this.refreshCustomer, this );
		
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
        
        self.refreshCustomer();
        
        application.dao.fetch("Bid",{ succeed: 1}, {limit : 1, order :'create_time desc'}, function(succeed, bids){
            if (succeed && bids.length > 0) {
                application.dao.fetch("Customer",{ id: bids[0].customer_id },{ limit: 1 },function(succeed, customers) {
                    if(succeed && customers.length > 0) {
                        self.lblBidName.text = customers[0].name;
                        self.lblBidGold.text = bids[0].gold;
                    }
                });
            }
        })
        
        var data = RES.getRes("animations.json");
        var txtr = RES.getRes("animations.png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );        
        self.mcBeauty = new egret.MovieClip( mcFactory.generateMovieClipData( "beauty" ) );
        self.mcBeauty.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.mcBeauty.gotoAndPlay(1);
            
            application.customer.gold += application.customer.output;
            application.dao.save("Customer",application.customer, null);
            self.lblGold.text    = application.customer.gold;
        },this);
        self.addChild(self.mcBeauty);
                
        /// 首次加载完成首先显示home
        self.goHome(); 
    }
	
	private refreshCustomer(): void {
        var self = this;
        
        self.lblGold.text    = application.customer.gold;
        self.lblDiamond.text = application.customer.diamond;
        self.lblOutput.text  = application.customer.output;
            
        //显示项目
        self.grpProject.removeChildren();
        application.dao.fetch("Project",{ customer_id: application.customer.id },{ order: 'sequence asc' },function(succeed, projects) {
            if(succeed && projects.length > 0) {
                for(var i = 0; i < projects.length; i ++){
                    var p = projects[i];
                    
                    var item: ProjectItem = new ProjectItem(p, application.projects[i], 0);
                    self.grpProject.addChildAt(item, i);
                }
            }
        });
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
        this.imgBg.source = "MBG_jpg";
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
