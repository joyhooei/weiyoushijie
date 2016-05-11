var ToolUI = (function (_super) {
    __extends(ToolUI, _super);
    function ToolUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/toolUISkin.exml";
    }
    var d = __define,c=ToolUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
        self.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.back();
        }, this);
        var tLayout = new eui.TileLayout();
        tLayout.horizontalGap = 0;
        tLayout.verticalGap = 0;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        tLayout.paddingTop = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 0;
        tLayout.paddingBottom = 0;
        tLayout.requestedColumnCount = 2; /// 设置两列显示
        this.grpProject.layout = tLayout; /// 网格布局
        for (var i = 0; i < 20; i++) {
            var item = new ToolItem(application.projects[i], (i + 1).toString() + "_png", "t" + (i + 1).toString() + "_png");
            this.grpProject.addChildAt(item, i);
        }
    };
    p.back = function () {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    };
    return ToolUI;
}(eui.Component));
egret.registerClass(ToolUI,'ToolUI');
