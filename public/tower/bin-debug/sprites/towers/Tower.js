var Tower = (function (_super) {
    __extends(Tower, _super);
    function Tower() {
        _super.call(this);
        this._displays.addClip("tower_building", "building");
        this.touchEnabled = true;
    }
    var d = __define,c=Tower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitSpeed = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", application.frameRate);
        this._price = this._get(properties, "price", 100);
        this._force = this._get(properties, "force", 10);
        this._upgradePrice = this._get(properties, "upgradePrice", 100);
        this._guardRadius = this._get(properties, "guardRadius", 10);
        this._base = null;
    };
    p.setBase = function (base) {
        this._base = base;
    };
    p.getGuardRadius = function () {
        return this._guardRadius;
    };
    p.getPrice = function () {
        return this._price;
    };
    p.getSellPrice = function () {
        return Math.round(this._price / 2);
    };
    p.getUpgradePrice = function () {
        return this._upgradePrice;
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        application.battle.incGolds(this.getSellPrice());
    };
    p._idle = function () {
        this.build();
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
        application.battle.incGolds(-this.getPrice());
    };
    p._building = function () {
        this._ticks++;
        if (this._ticks > this._buildTicks) {
            this.guard();
        }
    };
    p.select = function (again) {
        if (again) {
            this.deselect();
            return false;
        }
        else {
            application.showUI(new UpgradeTowerUI(this._base), application.battle.getUI(), this.getCenterX(), this.getCenterY());
            return true;
        }
    };
    p.deselect = function () {
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
    };
    return Tower;
}(Entity));
egret.registerClass(Tower,'Tower',["SelectableEntity"]);
//# sourceMappingURL=Tower.js.map