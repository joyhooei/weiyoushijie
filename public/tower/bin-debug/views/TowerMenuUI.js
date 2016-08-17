var TowerMenuUI = (function (_super) {
    __extends(TowerMenuUI, _super);
    function TowerMenuUI(base) {
        _super.call(this, "towerMenuUISkin");
        this._base = base;
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
    }
    var d = __define,c=TowerMenuUI,p=c.prototype;
    p._onRefresh = function () {
        var tower = this._base.getTower();
        if (tower) {
            switch (this._base.getTower().getClassName()) {
                case "SoldierTower1":
                    this._addUpgardeItem("SoldierTower2", "", 10, 10);
                    break;
            }
            this._addSellItem();
        }
        else {
        }
    };
    p._addUpgardeItem = function (towerName, path, x, y) {
        this._addItem(path, x, y).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            var tower = application.pool.get(towerName);
            this._tower.getParent().buildTower(tower);
            application.battle.hideAllTools();
        }, this);
    };
    p._addLockItem = function () {
        this._addItem("locktower", 0, -14).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            application.battle.hideAllTools();
        }, this);
    };
    p._addSellItem = function () {
        this._addItem("selltower", 43, 98).addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            this._tower.getParent().sellTower();
            application.battle.hideAllTools();
        }, this);
    };
    p._addItem = function (path, x, y) {
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