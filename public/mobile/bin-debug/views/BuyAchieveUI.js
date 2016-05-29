var BuyAchieveUI = (function (_super) {
    __extends(BuyAchieveUI, _super);
    function BuyAchieveUI(myProject, project, achieve) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this._achieve = achieve;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/buyAchieveUISkin.exml";
        this.imgIcon.source = "b" + achieve.toString() + "_png";
        this.imgProject.source = "t" + (myProject.sequence + 1).toString() + "_png";
        this.lblRatio.text = application.format(project.achieve(achieve).outputRatio);
        this.lblLevel.text = application.format(project.achieve(achieve).level);
    }
    var d = __define,c=BuyAchieveUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        var priceUseGold = this._project.achieve(this._myProject.achieve + 1).priceUseGold;
        this.lblGold.text = priceUseGold.toString();
        var priceUseDiamond = this._project.achieve(this._myProject.achieve + 1).priceUseDiamond;
        this.lblDiamond.text = priceUseDiamond.toString();
        if (this._myProject.achieve < this._achieve) {
            this.imgBuyUseGold.source = "buttoncoinno_png";
            this.imgBuyUseDiamond.source = "buttondiano_png";
        }
        else {
            if (application.usableGold() < priceUseGold) {
                this.imgBuyUseGold.source = "buttoncoinno_png";
            }
            else {
                this.imgBuyUseGold.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.buyAchieveUseGold();
                }, this);
            }
            if (application.customer.diamond < priceUseDiamond) {
                this.imgBuyUseDiamond.source = "buttondiano_png";
            }
            else {
                this.imgBuyUseDiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.buyAchieveUseDiamond();
                }, this);
            }
        }
    };
    p.delta = function () {
        return this._project.output(this._myProject.level, this._achieve, this._myProject.tool_ratio) - this._project.output(this._myProject.level, this._myProject.achieve, this._myProject.tool_ratio);
    };
    p.buyAchieveUseGold = function () {
        var self = this;
        var p = self._project.achieve(self._myProject.achieve + 1).priceUseGold;
        var delta = self.delta();
        self._myProject.achieve = self._achieve;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                application.buyOutput(p, 0, delta, self._myProject, function (succeed, c) {
                    if (!succeed) {
                        Toast.launch("获得成就失败");
                    }
                    else {
                        application.hideUI(self);
                    }
                });
            }
            else {
                Toast.launch("获得成就失败");
            }
        });
    };
    p.buyAchieveUseDiamond = function () {
        var self = this;
        var p = self._project.achieve(self._myProject.achieve + 1).priceUseDiamond;
        var delta = self.delta();
        self._myProject.achieve = self._achieve;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                application.buyOutput(0, p, delta, self._myProject, function (succeed, c) {
                    if (!succeed) {
                        Toast.launch("获得成就失败");
                    }
                    else {
                        application.hideUI(self);
                    }
                });
            }
            else {
                Toast.launch("获得成就失败");
            }
        });
    };
    return BuyAchieveUI;
}(eui.Component));
egret.registerClass(BuyAchieveUI,'BuyAchieveUI');
