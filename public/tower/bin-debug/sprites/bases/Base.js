var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.call(this);
        this.$touchEnabled = true;
    }
    var d = __define,c=Base,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._guardX = this._get(properties, "guardX", 0);
        this._guardY = this._get(properties, "guardY", 0);
        this._tower = null;
        this.guard();
    };
    p.getGuardX = function () {
        return this._guardX;
    };
    p.getGuardY = function () {
        return this._guardY;
    };
    p.getTower = function () {
        return this._tower;
    };
    p.setTower = function (tower) {
        this._clearTower();
        this._tower = tower;
        if (this._tower) {
            this.removeChildren();
            this.addChild(this._tower);
        }
        else {
            this.stain();
        }
    };
    p._clearTower = function () {
        if (this._tower) {
            this._tower.erase();
            this._tower = null;
        }
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        this._clearTower();
    };
    p.select = function (again) {
        if (!again) {
            application.battle.showTool(new TowerMenuUI(this), this.getCenterX(), this.getCenterY());
        }
        return true;
    };
    p.deselect = function () {
        application.battle.hideAllTools();
    };
    return Base;
}(Entity));
egret.registerClass(Base,'Base',["SelectableEntity"]);
//# sourceMappingURL=Base.js.map