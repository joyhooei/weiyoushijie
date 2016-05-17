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
        this.parent.removeChild(this);
    };
    p.uiCompHandler = function () {
        var _this = this;
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.back();
        }, this);
        if (application.customer.diamond < this._price) {
            this.btnBuy.enabled = false;
        }
        else {
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
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
                        this.back();
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
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    };
    p.buyTime = function () {
        application.customer.diamond -= this._price;
        application.customer.gold += application.customer.output * 3600 * 48;
        application.dao.save("Customer", application.customer, function (succeed, data) {
            Toast.launch("购买了时光沙漏");
            application.refreshCustomer(application.customer.output * 3600 * 48, -500, 0, 0, null);
            this.back();
        });
    };
    p.buyHit = function () {
        application.customer.diamond -= this._price;
        application.customer.total_hits = 3;
        application.dao.save("Customer", application.customer, function (succeed, data) {
            Toast.launch("购买了爆击");
            application.refreshCustomer(0, -100, 3, 0, null);
            this.back();
        });
    };
    return BuyToolUI;
}(eui.Component));
egret.registerClass(BuyToolUI,'BuyToolUI');
