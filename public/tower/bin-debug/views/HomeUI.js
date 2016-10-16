var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        var _this = this;
        _super.call(this, "homeUISkin");
        this._battles = [this.imgBattle1, this.imgBattle2, this.imgBattle3, this.imgBattle4, this.imgBattle5, this.imgBattle6, this.imgBattle7, this.imgBattle8, this.imgBattle9, this.imgBattle10, this.imgBattle11, this.imgBattle12, this.imgBattle13, this.imgBattle14, this.imgBattle15];
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            for (var i = 0; i < _this._battles.length; i++) {
                if (event.target == _this._battles[i]) {
                    _this._startBattle(i + 1);
                }
            }
        }, this);
        application.dao.addEventListener("Result", function (evt) {
            var result = evt.data;
            if (result.result == 1) {
                var stage = Math.min(15, result.stage + 1);
                this._battles[stage].visible = true;
            }
        }, self);
    }
    var d = __define,c=HomeUI,p=c.prototype;
    p.onRefresh = function () {
        var self = this;
        for (var i = 1; i < 15; i++) {
            self._battles[i].visible = false;
        }
        application.dao.fetch("Result", { customer_id: application.me.attrs.id, result: 1 }, { order: 'stage DESC', limit: 1 }).then(function (results) {
            self._battles[0].visible = true;
            if (results.length > 0) {
                var maxStage = Math.min(15, results[0].stage + 1);
                for (var i = 1; i < maxStage; i++) {
                    self._battles[i].visible = true;
                }
            }
        });
    };
    p._startBattle = function (stage) {
        this.show(new BattleLoadingUI(stage));
    };
    return HomeUI;
}(AbstractUI));
egret.registerClass(HomeUI,'HomeUI');
//# sourceMappingURL=HomeUI.js.map