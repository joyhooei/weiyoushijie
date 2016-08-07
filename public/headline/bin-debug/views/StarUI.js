/**
 *
 * @author
 *
 */
var StarUI = (function (_super) {
    __extends(StarUI, _super);
    function StarUI() {
        var _this = this;
        _super.call(this, "starUISkin");
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
    }
    var d = __define,c=StarUI,p=c.prototype;
    p.onRefresh = function () {
    };
    return StarUI;
}(AbstractUI));
egret.registerClass(StarUI,'StarUI');
