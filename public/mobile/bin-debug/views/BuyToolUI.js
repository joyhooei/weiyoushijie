var BuyToolUI = (function (_super) {
    __extends(BuyToolUI, _super);
    function BuyToolUI(name, price, myProject, project, levelAdded) {
        _super.call(this);
        this._myProject = myProject;
        this._project = project;
        this._levelAdded = levelAdded;
        this._name = name;
        this._price = price;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/buyToolUISkin.exml";
    }
    var d = __define,c=BuyToolUI,p=c.prototype;
    p.back = function () {
        application.back(this);
    };
    p.uiCompHandler = function () {
        var _this = this;
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.back();
        }, this);
        if (application.customer.diamond < this._price) {
            this.imgBuy.source = "buttoncoinno_png";
        }
        else {
            this.imgBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this._name == "project") {
                    _this.buyProject();
                }
                else if (_this._name == "time") {
                    _this.buyTime();
                }
                else if (_this._name == "hit") {
                    _this.buyHit();
                }
            }, this);
        }
        if (this._name == "project") {
            this.imgIcon.source = (1 + this._myProject.sequence).toString() + "_png";
            this.imgTitle.source = "t" + (1 + this._myProject.sequence).toString() + "_png";
            this.lblDescription.text = "提高" + this._levelAdded.toString() + "等级";
        }
        else if (this._name == "time") {
            this.imgIcon.source = "time_png";
            this.imgTitle.source = "";
            this.lblDescription.text = "增加" + (application.format(application.customer.output * 3600 * 48)).toString() + "金币";
        }
        else if (this._name == "hit") {
            this.imgIcon.source = "Hit_png";
            this.imgTitle.source = "";
            this.lblDescription.text = "增加" + (3 - application.customer.total_hits).toString() + "暴击";
        }
        this.lblDiamond.text = this._price.toString();
    };
    p.buyProject = function () {
        var self = this;
        var oldOutput = this.output();
        this._myProject.level += this._levelAdded;
        application.dao.save("Project", self._myProject, function (succeed, proj) {
            if (succeed) {
                application.buyOutput(0, self._price, self.output() - oldOutput, self._myProject, function (succeed, c) {
                    if (succeed) {
                        Toast.launch("购买成功");
                        self.back();
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
    };
    p.output = function () {
        return this._project.output(this._myProject.level, this._myProject.achieve);
    };
    p.buyTime = function () {
        var self = this;
        application.customer.diamond -= this._price;
        application.customer.gold += application.customer.output * 3600 * 48;
        application.dao.save("Customer", application.customer, function (succeed, data) {
            Toast.launch("购买了时光沙漏");
            application.refreshCustomer(application.customer.output * 3600 * 48, -500, 0, 0, null);
            self.back();
        });
    };
    p.buyHit = function () {
        var self = this;
        application.customer.diamond -= this._price;
        application.customer.total_hits = 3;
        application.dao.save("Customer", application.customer, function (succeed, data) {
            Toast.launch("购买了爆击");
            application.refreshCustomer(0, -100, 3, 0, null);
            self.back();
        });
    };
    return BuyToolUI;
}(eui.Component));
egret.registerClass(BuyToolUI,'BuyToolUI');
