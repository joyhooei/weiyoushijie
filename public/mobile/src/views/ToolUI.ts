class ToolUI extends eui.Component {
    private imgRet: eui.Image;
    
    private grpProject: eui.List;
    
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/toolUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;
        
        self.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            this.back();
        },this);
        
        var tLayout: eui.TileLayout = new eui.TileLayout();
        tLayout.horizontalGap = 0;
        tLayout.verticalGap = 0;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        tLayout.paddingTop = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 0;
        tLayout.paddingBottom = 0;
        tLayout.requestedColumnCount = 2;  /// 设置两列显示
        this.grpProject.layout = tLayout;    /// 网格布局
        
        for(var i = 0; i < 20; i++) {
            let item: ToolItem = new ToolItem(application.projects[i], (i + 1).toString() + "_png","t" + (i + 1).toString() + "_png");
            this.grpProject.addChildAt(item,i);
        }
    }
    
    private back(): void {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    }
}
