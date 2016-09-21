var BlockUI = (function (_super) {
    __extends(BlockUI, _super);
    function BlockUI() {
        var _this = this;
        _super.call(this, 'blockUISkin');
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            for (var i = 0; i < _this.numChildren; i++) {
                var child = _this.getChildAt(i);
                if (child != _this.rcBlock && child.hitTestPoint(event.stageX, event.stageY)) {
                    return;
                }
            }
            application.hideUI(_this);
        }, this);
    }
    var d = __define,c=BlockUI,p=c.prototype;
    return BlockUI;
}(AbstractUI));
egret.registerClass(BlockUI,'BlockUI');
//# sourceMappingURL=BlockUI.js.map