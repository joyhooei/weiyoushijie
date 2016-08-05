var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.call(this);
        this._tower = null;
        application.battle.enableSelect(this);
    }
    var d = __define,c=Base,p=c.prototype;
    p.setTower = function (tower) {
        this._tower = tower;
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
    return Base;
}(Entity));
egret.registerClass(Base,'Base');
