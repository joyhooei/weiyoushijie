var BuyAchieveUI = (function (_super) {
    __extends(BuyAchieveUI, _super);
    function BuyAchieveUI(myProject, project, icon) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/buyAchieveUISkin.exml";
        this.imgIcon.source = icon;
    }
    var d = __define,c=BuyAchieveUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        var p = this._project.goldPriceOfAchieve(this._myProject.achieve + 1);
        this.lblGold.text = p.toString();
        if (application.usableGold() < p) {
            this.imgBuyUseGold.source = "buttoncoinno_png";
        }
        else {
            this.imgBuyUseGold.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.buyAchieveUseGold();
            }, this);
        }
        p = this._project.diamondPriceOfAchieve(this._myProject.achieve + 1);
        this.lblDiamond.text = p.toString();
        if (application.customer.diamond < p) {
            this.imgBuyUseDiamond.source = "buttondiano_png";
        }
        else {
            this.imgBuyUseDiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.buyAchieveUseDiamond();
            }, this);
        }
        var delta = this.delta();
        var description = "获得成就将提高秒产" + delta.toString() + "个金币";
        this.lblDescription.text = description;
    };
    p.delta = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve + 1) - this._project.output(this._myProject.level, this._myProject.achieve);
    };
    p.buyAchieveUseGold = function () {
        var self = this;
        var p = self._project.goldPriceOfAchieve(self._myProject.achieve + 1);
        var delta = self.delta();
        self._myProject.achieve += 1;
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
        var p = self._project.diamondPriceOfAchieve(self._myProject.achieve + 1);
        var delta = self.delta();
        self._myProject.achieve += 1;
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
