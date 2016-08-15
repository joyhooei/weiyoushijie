var BuildTowerUI = (function (_super) {
    __extends(BuildTowerUI, _super);
    function BuildTowerUI(base) {
        _super.call(this, "buildTowerUISkin");
        this.imgArrowTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this._addTower("ArrowTower");
        }, this);
        this.imgBombTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this._addTower("BombTower");
        }, this);
        this.imgSoliderTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this._addTower("SoliderTower", { "guardX": this._base.getGuardX(), "guardY": this._base.getGuardY() });
        }, this);
        this.imgMagicTower.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this._addTower("MagicTower");
        }, this);
    }
    var d = __define,c=BuildTowerUI,p=c.prototype;
    p._addTower = function (name, options) {
        var tower = application.pool.get(name, options);
        tower.x = this._base.x;
        tower.y = this._base.y;
        this._base.buildTower(tower);
    };
    return BuildTowerUI;
}(AbstractUI));
egret.registerClass(BuildTowerUI,'BuildTowerUI');
//# sourceMappingURL=BuildTowerUI.js.map