var ResetUI = (function (_super) {
    __extends(ResetUI, _super);
    function ResetUI(myProject, project, diamond) {
        _super.call(this);
        this.diamond = diamond;
        this.myProject = myProject;
        this.project = project;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/resetUISkin.exml";
    }
    var d = __define,c=ResetUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.imgCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        this.imgOk.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var oldOutput = _this.output();
            _this.myProject.tool_ratio = 1;
            application.dao.save("Project", _this.myProject);
            application.customer.diamond += _this.diamond;
            application.customer.output += _this.output() - oldOutput;
            application.saveCustomerNow();
            application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, "重置了金手指", _this.diamond);
            Toast.launch("成功重置了金手指");
            application.hideUI(_this);
        }, this);
        this.lblDiamond.text = application.format(this.diamond);
    };
    p.output = function () {
        return this.project.output(this.myProject.level, this.myProject.achieve, this.myProject.tool_ratio);
    };
    return ResetUI;
}(eui.Component));
egret.registerClass(ResetUI,'ResetUI');
