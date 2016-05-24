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
        var self = this;
        if (application.customer.diamond >= price) {
            var oldOutput_1 = this.output();
            self._myProject.level += step;
            application.dao.save("Project", self._myProject, function (succeed, proj) {
                if (succeed) {
                    application.buyOutput(0, price, self.output() - oldOutput_1, self._myProject, function (succeed, c) {
                        if (succeed) {
                            Toast.launch("购买成功");
                        }
                        else {
                            Toast.launch("购买失败");
                        }
                    });
                }
                else {
                    Toast.launch("购买失败");
                }
            });
        }
        else {
            application.charge();
        }
    };
    p.output = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve);
    };
    return ToolItem;
}(eui.Component));
egret.registerClass(ToolItem,'ToolItem');
