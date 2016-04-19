/**
 * Created by egret on 2016/1/20.
 */

class HomeUI extends eui.Component{
    private grpProject: eui.List;
    private scrProjects: eui.Scroller;
    
    private mcBeauty: egret.MovieClip;
    
    private btnHome: eui.ToggleButton;
    private btnRank: eui.ToggleButton;
    private btnTool: eui.ToggleButton;
    private btnAuction: eui.ToggleButton;
    
    constructor( ) {
        super();

        this.addEventListener( GameEvents.EVT_REFRESH_CUSTOMER, this.refreshCustomer, this );
		
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/homeUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;
        
        self.btnHome.addEventListener( egret.TouchEvent.TOUCH_TAP, self.mbtnHandler, self );
        self.btnRank.addEventListener( egret.TouchEvent.TOUCH_TAP, self.mbtnHandler, self );
        self.btnTool.addEventListener( egret.TouchEvent.TOUCH_TAP, self.mbtnHandler, self );
        self.btnAuction.addEventListener( egret.TouchEvent.TOUCH_TAP, self.mbtnHandler, self );
        
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
    
    private  btns:eui.ToggleButton[];
    
    private resetFocus():void{
        console.log( " resetFocus " );
        if( this._uiFocused ){
            if( this._uiFocused.parent ){
                this._uiFocused.parent.removeChild( this._uiFocused );
            }
            this._uiFocused = null;
        }
        if( this._mbtnFocused !=null ){
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
            this._mbtnFocused = null;
        }
    }
    
    private goHome():void{
        this._pageFocusedPrev = this._pageFocused = GamePages.HOME;
        this.imgBg.source = "MBG_jpg";
    }
    
    private mbtnHandler( evt:egret.TouchEvent ):void{

        /// 已经选中不应当再处理!
        if( evt.currentTarget == this._mbtnFocused ) {
            console.log( evt.currentTarget.name, "已经选中不应当再处理!" );
            return;
        }
        /// 逻辑生效，所有按钮锁定
        for( var i:number = this.btns.length - 1; i > -1; --i ){
            this.btns[i].enabled = false;
        }

        /// 移除上一焦点对应的按钮
        //console.log( "remove _mbtnFocused:", this._mbtnFocused );
        if( this._mbtnFocused ){
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
        }
        /// 移除上一焦点对应的UI
        if( this._uiFocused && this._uiFocused.parent ){
            this._uiFocused.parent.removeChild( this._uiFocused );
        }
        
        /// 设置当前焦点按钮
        this._mbtnFocused = evt.currentTarget;
        console.log( "选中", this._mbtnFocused.name  );
        this._mbtnFocused.enabled = false;
        /// 焦点UI重置
        this._uiFocused = null;

        this._pageFocusedPrev = this._pageFocused;
        switch ( this._mbtnFocused ){
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
    private _pageFocusedPrev:string;

    createChildren():void {
        super.createChildren();
    }

    private _mbtnFocused:eui.ToggleButton;
    
    private _profileUI:ProfileUI;
    private _herosUI:HerosUI;
    private _goodsUI:GoodsUI;
    private _aboutUI:AboutUI;
    private _uiFocused:eui.Component;
    
    private imgBg:eui.Image;
    
    private lblGold:eui.Label;
    private lblDiamond: eui.Label;
    
    private lblBidName:eui.Label;
    private lblBidGold:eui.Label;
    
    private lblOutput: eui.Label;

    private _pageFocused:string;

    public pageReadyHandler( pageName:String ):void {
        console.log( "页面就绪:", pageName  );
        /// 页面加载完成，所有非焦点按钮解锁
        for( var i:number = this.btns.length - 1; i > -1; --i ){
            this.btns[i].enabled = ! this.btns[i].selected;
        }
        
        switch ( pageName ){
            case GamePages.HOME:
                if( !this._profileUI ){
                    this._profileUI = new ProfileUI;
                    this._profileUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
                        this.resetFocus();
                        this.goHome();
                    }, this );
                }
                this.imgBg.source = "commonBg_jpg";
                this._uiFocused = this._profileUI;
                break;
            case GamePages.RANK:
                if( !this._herosUI ){
                    this._herosUI = new HerosUI();
                    this._herosUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
                        this.resetFocus();
                        this.goHome();
                    }, this );
                }
                this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._herosUI;
                break;
            case GamePages.TOOL:
                if( !this._goodsUI ){
                    this._goodsUI = new GoodsUI();
                    this._goodsUI.addEventListener( GameEvents.EVT_RETURN, ()=>{
                        this.resetFocus();
                        this.goHome();
                    }, this );
                }
                this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._goodsUI;
                break;
            case GamePages.AUCTION:
                if( !this._aboutUI ){
                    this._aboutUI = new AboutUI();
                    this._aboutUI.addEventListener( GameEvents.EVT_CLOSE_ABOUT, ()=>{
                        this.resetFocus();
                        console.log( "关闭关于 返回:", this._pageFocusedPrev );
                        switch ( this._pageFocusedPrev ){
                            case GamePages.HOME:
                                this.btnHome.selected = true;
                                this.btnHome.dispatchEventWith( egret.TouchEvent.TOUCH_TAP );
                                break;
                            case GamePages.RANK:
                                this.btnRank.selected = true;
                                this.btnRank.dispatchEventWith( egret.TouchEvent.TOUCH_TAP );
                                break;
                            case GamePages.TOOL:
                                this.btnTool.selected = true;
                                this.btnTool.dispatchEventWith( egret.TouchEvent.TOUCH_TAP );
                                break;
                        }
                    }, this );
                }
                //this.imgBg.source = "homeBg_jpg";
                this._uiFocused = this._aboutUI;
                break;
        }
        /// 总是把页面放在背景的上一层！
        this.addChildAt( this._uiFocused, this.getChildIndex( this.imgBg ) + 1 );
    }
}
