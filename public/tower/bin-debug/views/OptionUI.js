var OptionUI = (function (_super) {
    __extends(OptionUI, _super);
    function OptionUI(iconPath, content, cbOk, cbCancel) {
        var _this = this;
        _super.call(this, "towerOptionUISkin");
        this._iconPath = iconPath;
        this._content = content;
        this._cbOk = cbOk;
        this._cbCancel = cbCancel;
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, this);
        this.imgOk.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._cbOk) {
                _this._cbOk();
            }
            _this.hide();
        }, this);
        this.imgCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._cbCancel) {
                _this._cbCancel();
            }
            _this.hide();
        }, this);
    }
    var d = __define,c=OptionUI,p=c.prototype;
    p.onRefresh = function () {
        this.imgIcon.source = this._iconPath;
        this.lblContent.text = this._content;
    };
    return OptionUI;
}(AbstractUI));
egret.registerClass(OptionUI,'OptionUI');
//# sourceMappingURL=OptionUI.js.map