//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private _loadingUI: LoadingUI;

    private _isThemeLoadEnd: boolean = false;

    private _isResourceLoadEnd: boolean = false;

    private _idLoading: string;
    
    private _trueLoadingUI: TrueLoadingUI;

    private _homeUI: HomeUI;

    private _loadingBg: egret.Bitmap;
    
    private _loginUI: LoginUI;

    protected createChildren(): void {
        super.createChildren();
        
        //inject the custom material parser
        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter",new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
      
        //Config loading process interface
        //设置加载进度界面
        this._loadingUI = new LoadingUI();
        this.stage.addChild(this._loadingUI);
      
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        
        router.init(this);
      
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    }

    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this._isThemeLoadEnd = true;
        this.createScene();
    }

    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        switch (event.groupName ) {
            case "loading":
                if( this._loadingUI.parent ){
                    this._loadingUI.parent.removeChild( this._loadingUI );
                }
            
                Toast.init( this, RES.getRes( "toast-bg_png" ) ); 
    
                this._loadingBg = new egret.Bitmap(RES.getRes("loading_bg"));
                this.addChild( this._loadingBg );
                
                this._trueLoadingUI = new TrueLoadingUI();
                this.loadPage("login");
                break;
            
          case "login":
                this._loginUI = new LoginUI();
                this.addChild(this._loginUI);
                break;
            
            case "home":
                this._isResourceLoadEnd = true;
                this.createScene();
                break;
            
            //case "profile": 
            default :
                console.log( "\tpage["+event.groupName+"]ok:", egret.getTimer() );
                this.pageLoadedHandler( event.groupName );
                break;
        } 
    }
    
    private clearRESEvents():void{
        //RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        //RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        //RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        //RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
    }
    
    private createScene(){
        if(this._isThemeLoadEnd && this._isResourceLoadEnd){
            this.startCreateScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        switch (event.groupName) {
            case "loading":
                this._loadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
                break;
            
            //case "home":
            //case "profile":
            default :
                this._trueLoadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
                break;
        }
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        /// 主页特殊，其他页都需要传参数
        this.pageLoadedHandler( "home" );

        if( this._loadingBg.parent ){
            this._loadingBg.parent.removeChild( this._loadingBg );
        }
        
        this._homeUI = new HomeUI();
        this._homeUI.addEventListener( GameEvents.EVT_LOAD_PAGE, ( evt:egret.Event )=>{
            this.loadPage( evt.data );
        }, this );
        this.addChild( this._homeUI );
    }
    
    public loadPage( pageName:string ):void{
        this.addChild( this._trueLoadingUI );
        this._idLoading = pageName;
      
        switch ( pageName ){
            case "heros":
            case "goods":
                RES.loadGroup( "heros_goods" );
                break;
            
            default :
                RES.loadGroup( pageName );
                break;
        }
    }
    
    pageLoadedHandler( name:string ):void{
        if( name != "home" ){
            this._homeUI.pageReadyHandler( this._idLoading );
        }
      
        if( this._trueLoadingUI.parent ){
            this._trueLoadingUI.parent.removeChild( this._trueLoadingUI );
        }
    }
}
