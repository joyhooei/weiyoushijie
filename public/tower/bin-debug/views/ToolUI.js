var ToolUI = (function (_super) {
    __extends(ToolUI, _super);
    function ToolUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/toolUISkin.exml";
    }
    var d = __define,c=ToolUI,p=c.prototype;
    p.refresh = function () {
        var self = this;
        this.lblGold.text = Utility.format(application.me.usableGold());
        this.lblDiamond.text = Utility.format(application.me.attrs.diamond);
        var tLayout = new eui.TileLayout();
        tLayout.horizontalGap = 0;
        tLayout.verticalGap = 0;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.TOP;
        tLayout.paddingTop = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 0;
        tLayout.paddingBottom = 0;
        tLayout.requestedColumnCount = 2; /// 设置两列显示
        this.grpProject.layout = tLayout; /// 网格布局
    };
    p.uiCompHandler = function () {
        var _this = this;
        this.refresh();
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        application.dao.addEventListener("Customer", function (evt) {
            this.lblGold.text = Utility.format(application.me.usableGold());
            this.lblDiamond.text = Utility.format(application.me.attrs.diamond);
        }, this);
        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("time", 500));
        }, this);
        this.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new ChargeTipUI());
        }, this);
        this.imgHit.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("hit", 100), this);
        }, this);
        this.imgTime.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("time", 500), this);
        }, this);
        this.imgTicket.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("ticket", 19), this);
        }, this);
        this.imgVIP.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("vip", 49), this);
        }, this);
    };
    return ToolUI;
}(eui.Component));
egret.registerClass(ToolUI,'ToolUI');
//# sourceMappingURL=ToolUI.js.map