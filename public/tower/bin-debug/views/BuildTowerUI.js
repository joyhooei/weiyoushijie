var BuildTowerUI = (function (_super) {
    __extends(BuildTowerUI, _super);
    function BuildTowerUI(base) {
        _super.call(this, "buildTowerUISkin");
        this._base = base;
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
    }
    var d = __define,c=BuildTowerUI,p=c.prototype;
    p.onRefresh = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
        this._renderTower(96, 15, "soldier_tower", "SoldierTower1", 300);
        this._renderTower(32, 80, "arrow_tower", "ArrowTower1", 300);
        this._renderTower(160, 80, "bomb_tower", "BombTower1", 300);
        this._renderTower(96, 145, "magic_tower", "MagicTower1", 300);
    };
    p._renderTower = function (x, y, res, claz, price) {
        var _this = this;
        var data = RES.getRes(res + "_json");
        var txtr = RES.getRes(res + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var clip = new egret.MovieClip(mcFactory.generateMovieClipData(res));
        clip.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (application.battle.getGolds() > price) {
                application.battle.incGolds(-price);
                _this._base.setTower(application.pool.get(claz));
                application.hideUI(_this);
            }
        }, this);
        clip.touchEnabled = true;
        clip.x = x + 20;
        clip.y = y + 20;
        clip.frameRate = 8;
        this.addChild(clip);
        clip.gotoAndPlay(0, -1);
    };
    return BuildTowerUI;
}(AbstractUI));
egret.registerClass(BuildTowerUI,'BuildTowerUI');
//# sourceMappingURL=BuildTowerUI.js.map