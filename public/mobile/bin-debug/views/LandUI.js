var LandUI = (function (_super) {
    __extends(LandUI, _super);
    function LandUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/loginUISkin.exml";
    }
    var d = __define,c=LandUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
    };
    return LandUI;
}(eui.Component));
egret.registerClass(LandUI,'LandUI');
