var BuildTowerUI = (function (_super) {
    __extends(BuildTowerUI, _super);
    function BuildTowerUI(base) {
        _super.call(this, "buildTowerUISkin");
        this._base = base;
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
        this._mcTowers = [];
        application.stopwatch.addEventListener("second", function (event) {
            if (event.data % 10 == 0) {
                for (var i = 0; i < this._mcTowers.length; i++) {
                    this._mcTowers[i].gotoAndPlay(0, 1);
                }
            }
        }, this);
    }
    var d = __define,c=BuildTowerUI,p=c.prototype;
    p.onRefresh = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
        var options = { guardX: this._base.getGuardX(), guardY: this._base.getGuardY() };
        this._soldierTower = application.pool.get("SoldierTower1", options);
        this.lblSoldierTower.text = this._soldierTower.getPrice().toString();
        this._mcTowers.push(this._renderTower(96, 15, "soldier_tower", this._soldierTower));
        this._arrowTower = application.pool.get("ArrowTower1", options);
        this.lblArrowTower.text = this._arrowTower.getPrice().toString();
        this._mcTowers.push(this._renderTower(32, 80, "arrow_tower", this._arrowTower));
        this._bombTower = application.pool.get("BombTower1", options);
        this.lblBombTower.text = this._bombTower.getPrice().toString();
        this._mcTowers.push(this._renderTower(160, 80, "bomb_tower", this._bombTower));
        this._magicTower = application.pool.get("MagicTower1", options);
        this.lblMagicTower.text = this._magicTower.getPrice().toString();
        this._mcTowers.push(this._renderTower(96, 145, "magic_tower", this._magicTower));
    };
    p._renderTower = function (x, y, res, tower) {
        var _this = this;
        var data = RES.getRes(res + "_json");
        var txtr = RES.getRes(res + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var clip = new egret.MovieClip(mcFactory.generateMovieClipData(res));
        clip.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (application.battle.getGolds() >= tower.getPrice()) {
                _this._base.setTower(tower);
                application.hideUI(_this);
            }
            else {
                Toast.launch("需要更多的金币");
            }
        }, this);
        clip.touchEnabled = true;
        clip.x = x + 20;
        clip.y = y + 20;
        clip.frameRate = 6;
        this.addChild(clip);
        clip.gotoAndPlay(0, 1);
        return clip;
    };
    return BuildTowerUI;
}(AbstractUI));
egret.registerClass(BuildTowerUI,'BuildTowerUI');
//# sourceMappingURL=BuildTowerUI.js.map