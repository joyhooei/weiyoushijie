var ToolItem = (function (_super) {
    __extends(ToolItem, _super);
    function ToolItem(myproject, project, iconName, titleName) {
        var _this = this;
        _super.call(this);
        this._project = project;
        this._myProject = myproject;
        this.skinName = "resource/custom_skins/toolItemSkin.exml";
        this.img100.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy(100, 1);
        }, this);
        this.img900.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy(900, 10);
        }, this);
        this.imgIcon.source = iconName;
        this.imgTitle.source = titleName;
    }
    var d = __define,c=ToolItem,p=c.prototype;
    p.buy = function (price, step) {
        application.showUI(new BuyToolUI("project", price, this._myProject, this._project, step));
    };
    return ToolItem;
}(eui.Component));
egret.registerClass(ToolItem,'ToolItem');
