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
        this.lblLevel.text = project.achieve(achieve).level.toString();
    }
    var d = __define,c=BuyAchieveUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        //如果当前级别小于成就所需要的级别，则不能购买
        //如果上一个成就还没有解锁，则不能购买
        //如果已经购买了，也不能购买
        if (this._myProject.level < this._project.achieve(this._achieve).level
            || this._achieve > this._myProject.achieve + 1
            || this._achieve <= this._myProject.achieve) {
            this.imgBuyUseGold.source = "";
            this.imgBuyUseDiamond.source = "";
            this.lblGold.text = "";
            this.lblDiamond.text = "";
        }
        else {
            var priceUseGold_1 = this._project.achieve(this._achieve).priceUseGold;
            this.lblGold.text = application.format(priceUseGold_1);
            var priceUseDiamond_1 = this._project.achieve(this._achieve).priceUseDiamond;
            this.lblDiamond.text = priceUseDiamond_1;
            if (application.usableGold() < priceUseGold_1) {
                this.imgBuyUseGold.source = "buttoncoinno_png";
                this.imgBuyUseGold.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    application.showUI(new BuyToolUI(null, "time", 500), _this);
                }, this);
            }
            else {
                this.imgBuyUseGold.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this._buy(priceUseGold_1, 0);
                }, this);
            }
            if (application.customer.diamond < priceUseDiamond_1) {
                this.imgBuyUseDiamond.source = "buttondiano_png";
                this.imgBuyUseDiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    application.showUI(new ChargeTipUI(), _this);
                }, this);
            }
            else {
                this.imgBuyUseDiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this._buy(0, priceUseDiamond_1);
                }, this);
            }
        }
    };
    p._buy = function (gold, diamond) {
        var self = this;
        var newOutput = self._project.output(self._myProject.level, self._achieve, self._myProject.tool_ratio);
        var oldOutput = self._project.output(self._myProject.level, self._myProject.achieve, self._myProject.tool_ratio);
        self._myProject.achieve = self._achieve;
        application.buyOutput(gold, diamond, newOutput - oldOutput, self._myProject, function (succeed, c) {
            if (succeed) {
                Toast.launch("获得成就成功");
                application.dao.save("Project", self._myProject);
                application.hideUI(self);
            }
            else {
                Toast.launch("获得成就失败");
            }
        });
    };
    return BuyAchieveUI;
}(eui.Component));
egret.registerClass(BuyAchieveUI,'BuyAchieveUI');
