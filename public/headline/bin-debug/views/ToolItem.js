var ToolItem = (function (_super) {
    __extends(ToolItem, _super);
    function ToolItem(toolUI, myProject, project, iconName, titleName) {
        var _this = this;
        _super.call(this);
        this._project = project;
        this._myProject = myProject;
        this._toolUI = toolUI;
        this.skinName = "resource/custom_skins/toolItemSkin.exml";
        this.img100.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy(100, 1);
        }, this);
        this.img900.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy(900, 10);
        }, this);
        this.imgIcon.source = iconName;
        this.imgTitle.source = titleName;
        this.refresh();
    }
    var d = __define,c=ToolItem,p=c.prototype;
    p.refresh = function () {
        this.lbl1.text = application.format(this._myProject.tool_ratio);
        this.lbl100.text = application.format(this.ratio(this._myProject.tool_ratio, 1));
        this.lbl900.text = application.format(this.ratio(this._myProject.tool_ratio, 10));
    };
    p.buy = function (price, step) {
        var self = this;
        if (application.customer.diamond >= price) {
            var oldOutput = this.output();
            self._myProject.tool_ratio = self.ratio(self._myProject.tool_ratio, step);
            application.buyOutput(0, price, self.output() - oldOutput, self._myProject, function (succeed, c) {
                if (succeed) {
                    Toast.launch("购买成功");
                    application.dao.save("Project", self._myProject);
                    self.refresh();
                    if (self._toolUI) {
                        self._toolUI.refreshCustomer();
                    }
                }
                else {
                    Toast.launch("购买失败");
                }
            });
        }
        else {
            application.showUI(new ChargeTipUI());
        }
    };
    //购买一次的倍数
    p.ratioOne = function (oldRatio) {
        var ratios = [
            1,
            5,
            50,
            200,
            2000,
            10000,
            100000,
            500000,
            5000000,
            25000000,
            125000000,
            625000000,
            5000000000,
            40000000000,
            200000000000
        ];
        var i = application.log10(oldRatio);
        if (i < ratios.length) {
            return oldRatio + ratios[i];
        }
        else {
            var delta = ratios[ratios.length - 1];
            for (var j = 0; j < (i - ratios.length); j++) {
                delta = delta * 10;
            }
            return oldRatio + delta;
        }
    };
    //购买十次的倍数
    p.ratio = function (oldRatio, step) {
        for (var i = 0; i < step; i++) {
            oldRatio = this.ratioOne(oldRatio);
        }
        return oldRatio;
    };
    p.output = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve, this._myProject.tool_ratio);
    };
    return ToolItem;
}(eui.Component));
egret.registerClass(ToolItem,'ToolItem');
