var BuyAchieveUI = (function (_super) {
    __extends(BuyAchieveUI, _super);
    function BuyAchieveUI(myProject, project) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/buyAchieveUISkin.exml";
    }
    var d = __define,c=BuyAchieveUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.parent.removeChild(_this);
        }, this);
        var p = this._project.goldPriceOfAchieve(this._myProject.achieve + 1);
        this.lblGold.text = p.toString();
        if (application.customer.gold < p) {
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
    };
    p.output = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    };
    p.buyAchieveUseGold = function () {
        var self = this;
        var p = self._project.goldPriceOfAchieve(self._myProject.achieve + 1);
        var oldOutput = self.output();
        self._myProject.achieve += 1;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                var newOutput = self.output();
                application.buyOutput(p, 0, newOutput - oldOutput, self._myProject, function (succeed, c) {
                    if (!succeed) {
                        Toast.launch("获得成就失败");
                    }
                    else {
                        self.parent.removeChild(self);
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
        var oldOutput = self.output();
        self._myProject.achieve += 1;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                var newOutput = self.output();
                application.buyOutput(0, p, newOutput - oldOutput, self._myProject, function (succeed, c) {
                    if (!succeed) {
                        Toast.launch("获得成就失败");
                    }
                    else {
                        self.parent.removeChild(self);
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
