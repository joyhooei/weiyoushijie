var BattleItem = (function (_super) {
    __extends(BattleItem, _super);
    function BattleItem(stage) {
        var _this = this;
        _super.call(this, "battleItemSkin");
        this._stage = stage;
        this._locked = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!_this._locked) {
                _this.show(new BattleLoadingUI(_this._stage));
            }
        }, this);
    }
    var d = __define,c=BattleItem,p=c.prototype;
    p.onRefresh = function () {
        this.imgBattle.source = "map_" + this._stage.toString() + "_png";
        this.imgLock.visible = this._locked;
        this.imgLock.x = this.imgBattle.x + (this.imgBattle.width - this.imgLock.width) / 2;
        this.imgLock.y = this.imgBattle.y + (this.imgBattle.height - this.imgLock.height) / 2;
    };
    p.unlock = function () {
        if (this._locked) {
            this._locked = false;
            this.refresh();
        }
    };
    return BattleItem;
}(AbstractUI));
egret.registerClass(BattleItem,'BattleItem');
//# sourceMappingURL=BattleItem.js.map