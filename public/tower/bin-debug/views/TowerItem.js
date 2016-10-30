var TowerItem = (function (_super) {
    __extends(TowerItem, _super);
    function TowerItem(path, price) {
        _super.call(this, "towerItemSkin");
        this._path = path;
        this._price = price;
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
    }
    var d = __define,c=TowerItem,p=c.prototype;
    p.onRefresh = function () {
        this.imgButton.source = this._path;
        this.lblPrice.text = this._price.toString();
        if (application.battle.getGolds() >= this._price) {
            this.lblPrice.textColor = 0X000000;
        }
        else {
            this.lblPrice.textColor = 0XFF0000;
        }
    };
    TowerItem.createSellItem = function (parent, x, y, base) {
        var towerItem = TowerItem.createItem(parent, x, y, "remove_png", base.getTower().getSellPrice());
        towerItem.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            base.setTower(null);
            parent.hide();
        }, this);
        return towerItem;
    };
    TowerItem.createItem = function (parent, x, y, path, price) {
        var towerItem = new TowerItem(path, price);
        towerItem.x = x;
        towerItem.y = y;
        parent.addChild(towerItem);
        return towerItem;
    };
    return TowerItem;
}(AbstractUI));
egret.registerClass(TowerItem,'TowerItem');
//# sourceMappingURL=TowerItem.js.map