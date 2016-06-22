var ReportUI = (function (_super) {
    __extends(ReportUI, _super);
    function ReportUI() {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/reportUISkin.exml";
        this.imgCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        this.imgOK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.txtContent.text.length > 0) {
                var report = { customer_id: application.customer.id, content: _this.txtContent.text, state: 0 };
                application.dao.save("Report", report);
                application.hideUI(_this);
            }
            else {
                Toast.launch("请填写错误的内容");
            }
        }, this);
    }
    var d = __define,c=ReportUI,p=c.prototype;
    return ReportUI;
}(eui.Component));
egret.registerClass(ReportUI,'ReportUI');
