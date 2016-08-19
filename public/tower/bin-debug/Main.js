var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
        this._isThemeLoadEnd = false;
        this._isResourceLoadEnd = false;
    }
    var d = __define,c=Main,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.TextField.default_fontFamily = "STXihei";
        if (!egret.Capabilities.isMobile) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            this.stage.orientation = egret.OrientationMode.AUTO;
        }
        //inject the custom material parser
        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        application.init(this);
        application.channel.openScreen(this.stage);
        application.channel.track(TRACK_CATEGORY_RESOURCE, TRACK_ACTION_LOAD, "开始加载配置文件", 1);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    p.onConfigComplete = function (event) {
        application.channel.track(TRACK_CATEGORY_RESOURCE, TRACK_ACTION_LOAD, "开始加载皮肤主题资源", 2);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    p.onThemeLoadComplete = function () {
        this._isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        var _this = this;
        var self = this;
        switch (event.groupName) {
            case "loading":
                Toast.init(this, RES.getRes("toast-bg_png"));
                this._trueLoadingUI = new TrueLoadingUI();
                application.channel.track(TRACK_CATEGORY_RESOURCE, TRACK_ACTION_LOAD, "开始加载着陆页面", 3);
                if (application.development == 1) {
                    this.loadPage("home");
                }
                else {
                    this.loadPage("landing");
                }
                break;
            case "landing":
                this.addChild(new LandingUI());
                this.addEventListener(GameEvents.EVT_LOGIN_IN_SUCCESS, function (evt) {
                    _this.loadPage("home");
                }, this);
                break;
            case "home":
                this._trueLoadingUI.removeBgImage();
                this._isResourceLoadEnd = true;
                this.createScene();
                break;
            default:
                console.log("\tpage[" + event.groupName + "]ok:", egret.getTimer());
                this.pageLoadedHandler(event.groupName);
                break;
        }
    };
    p.clearRESEvents = function () {
        //RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        //RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        //RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        //RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
    };
    p.createScene = function () {
        if (this._isThemeLoadEnd && this._isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    p.onResourceProgress = function (event) {
        switch (event.groupName) {
            case "loading":
                application.channel.setOpenScreenProgress(event.itemsLoaded, event.itemsTotal, '');
                break;
            default:
                this._trueLoadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
                break;
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    p.startCreateScene = function () {
        var _this = this;
        /// 主页特殊，其他页都需要传参数
        this.pageLoadedHandler("home");
        this.homeUI = new HomeUI();
        this.homeUI.addEventListener(GameEvents.EVT_LOAD_PAGE, function (evt) {
            _this.loadPage(evt.data);
        }, this);
        this.addChild(this.homeUI);
    };
    p.loadPage = function (pageName) {
        this.addChild(this._trueLoadingUI);
        this._idLoading = pageName;
        RES.loadGroup(pageName);
    };
    p.pageLoadedHandler = function (name) {
        if (this._trueLoadingUI.parent) {
            this._trueLoadingUI.parent.removeChild(this._trueLoadingUI);
        }
    };
    return Main;
}(eui.UILayer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map