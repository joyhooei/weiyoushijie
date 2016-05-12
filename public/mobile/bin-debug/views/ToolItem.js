var ToolItem = (function (_super) {
    __extends(ToolItem, _super);
    function ToolItem(myproject, project, iconName, titleName) {
        _super.call(this);
        this._project = project;
        this._myproject = myproject;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/toolItemSkin.exml";
        this.imgIcon.source = iconName;
        this.imgTitle.source = titleName;
    }
    var d = __define,c=ToolItem,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.img100.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy(100, 1);
        }, this);
        this.img900.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy(900, 10);
        }, this);
    };
    p.buy = function (price, level) {
        if (application.customer.diamond < price) {
            Toast.launch("钻石不够");
        }
        else {
            var order = { customer_id: application.customer.id, product: "project_" + this._project.sequence + "_" + level };
            application.dao.save("Order", order, function (succeed, o) {
                if (succeed) {
                    application.fetchCustomer();
                    Toast.launch("购买了运营");
                }
                else {
                    Toast.launch("购买失败");
                }
            });
        }
    };
    return ToolItem;
}(eui.Component));
egret.registerClass(ToolItem,'ToolItem');
