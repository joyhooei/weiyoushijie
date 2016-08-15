var TowerMenuUI = (function (_super) {
    __extends(TowerMenuUI, _super);
    function TowerMenuUI(tower) {
        _super.call(this, "towerMenuUISkin");
        this._tower = tower;
    }
    var d = __define,c=TowerMenuUI,p=c.prototype;
    p._addUpgardeImage = function (towerName, path, x, y) {
        this._addImage(path, x, y).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            var tower = application.pool.get(towerName);
            this._tower.getParent().buildTower(tower);
            application.hideUI(this);
        }, this);
    };
    p._addLockImage = function () {
        this._addImage("locktower", 0, -14).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            application.hideUI(this);
        }, this);
    };
    p._addSellImage = function () {
        this._addImage("selltower", 43, 98).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            this._tower.getParent().sellTower();
            application.hideUI(this);
        }, this);
    };
    p._addImage = function (path, x, y) {
        var image = new eui.Image();
        image.source = path;
        image.x = x;
        image.y = y;
        image.touchEnabled = true;
        this.addChild(image);
        return image;
    };
    return TowerMenuUI;
}(AbstractUI));
egret.registerClass(TowerMenuUI,'TowerMenuUI');
//# sourceMappingURL=TowerMenuUI.js.map