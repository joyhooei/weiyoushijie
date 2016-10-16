var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.call(this);
        this.touchEnabled = true;
    }
    var d = __define,c=Base,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._guardX = this._get(properties, "guardX", 0);
        this._guardY = this._get(properties, "guardY", 0);
        this._tower = null;
        this._unused = true;
        this.guard();
    };
    p.unused = function () {
        return this._unused;
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
        if (this._tower) {
            this._tower.erase();
            if (this._parent) {
                this._parent.addChild(this);
            }
        }
        this._tower = tower;
        if (this._tower) {
            this._tower.setCenterX(this.getCenterX());
            this._tower.setCenterY(this.getCenterY());
            this._tower.setBase(this);
            application.battle.addTower(this._tower);
            if (this.parent) {
                this._parent = this.parent;
                this._parent.removeChild(this);
            }
            this._unused = false;
        }
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        if (this._tower) {
            this._tower.erase();
            this._tower = null;
        }
    };
    p.select = function (again) {
        if (again) {
            this.deselect();
            return false;
        }
        else {
            application.showUI(new BuildTowerUI(this), application.battle.parent, this.getCenterX(), this.getCenterY());
            return true;
        }
    };
    p.deselect = function () {
    };
    return Base;
}(Entity));
egret.registerClass(Base,'Base',["SelectableEntity"]);
//# sourceMappingURL=Base.js.map