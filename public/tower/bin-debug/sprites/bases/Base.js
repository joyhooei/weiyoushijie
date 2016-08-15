var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.call(this);
        application.battle.enableSelect(this);
    }
    var d = __define,c=Base,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._guardX = this._get(properties, "guardX", 0);
        this._guardY = this._get(properties, "guardY", 0);
        this._tower = null;
    };
    p.getGuardX = function () {
        return this._guardX;
    };
    p.getGuardY = function () {
        return this._guardY;
    };
    p.buildTower = function (tower) {
        if (this._tower) {
            this._tower.erase();
        }
        this._tower = tower;
        this._tower.setParent(this);
    };
    p.sellTower = function () {
        this._tower.kill();
        this._tower = null;
    };
    p.select = function (again) {
        if (this._tower) {
            application.battle.showTool(new TowerMenuUI(this._tower), this.x, this.y);
        }
        else {
            application.battle.showTool(new BuildTowerUI(this), this.x, this.y);
        }
    };
    p.deselect = function () {
        application.battle.hideAllTools();
    };
    p.paint = function () {
        if (this._tower) {
            this._tower.paint();
        }
        else {
            _super.prototype.paint.call(this);
        }
    };
    return Base;
}(Entity));
egret.registerClass(Base,'Base');
//# sourceMappingURL=Base.js.map