var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        var _this = this;
        _super.call(this, "homeUISkin");
        this._paths = [
            [[327, 95], [337, 142], [276, 157], [211, 189], [143, 126]],
        ];
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
                var i = Math.min(15, result.stage + 1);
                this._battles[i].visible = true;
                this._drawPathSlowly(i);
            }
        }, this);
    }
    var d = __define,c=HomeUI,p=c.prototype;
    p.onRefresh = function () {
        var self = this;
        self._shapePath = new egret.Shape();
        self._shapePath.x = self.imgBg.x;
        self._shapePath.y = self.imgBg.y;
        self._shapePath.width = self.imgBg.width;
        self._shapePath.height = self.imgBg.height;
        self.grpMap.addChild(self._shapePath);
        for (var i = 1; i < 15; i++) {
            self._battles[i].visible = false;
        }
        application.dao.fetch("Result", { customer_id: application.me.attrs.id, result: 1 }, { order: 'stage DESC', limit: 1 }).then(function (results) {
            self._battles[0].visible = true;
            if (results.length > 0) {
                var maxStage = Math.min(15, results[0].stage + 1);
                for (var i = 1; i < maxStage; i++) {
                    self._battles[i].visible = true;
                    self._drawPathQuckly(i);
                }
            }
        });
    };
    p._drawPathQuckly = function (stage) {
        var bezier = this._createCubicBezier(stage);
        this._drawPoint(bezier.get(0), 0);
        if (bezier) {
            var t = 0;
            while (t <= 1) {
                t = this._drawPathPoint(bezier, t);
            }
            ;
        }
    };
    p._drawPathSlowly = function (stage) {
        var self = this;
        var bezier = self._createCubicBezier(stage);
        this._drawPoint(bezier.get(0), 0);
        if (bezier) {
            var t_1 = 0;
            var interval_1 = setInterval(function () {
                if (t_1 > 1) {
                    clearInterval(interval_1);
                }
                else {
                    t_1 = self._drawPathPoint(bezier, t_1);
                }
            }, 100);
        }
    };
    p._createCubicBezier = function (stage) {
        var path = this._paths[stage - 1];
        if (path) {
            for (var i = 0; i < path.length; i++) {
                this._drawPoint(path[i], 0xFF0000);
            }
            return new CubicBezier(path);
        }
        else {
            return null;
        }
    };
    p._drawPathPoint = function (bezier, t) {
        var last = bezier.get(t);
        while (t <= 1) {
            t = t + 0.01;
            var pt = bezier.get(t);
            var distance = Math.round(Math.pow(last[0] - pt[0], 2) + Math.pow(last[1] - pt[1], 2));
            if (distance >= 64) {
                this._drawPoint(pt, 0x000000);
                return t;
            }
        }
        return t;
    };
    p._drawPoint = function (pt, color) {
        this._shapePath.graphics.beginFill(color, 1);
        this._shapePath.graphics.drawCircle(pt[0], pt[1], 3);
        this._shapePath.graphics.endFill();
    };
    p._startBattle = function (stage) {
        this.show(new BattleLoadingUI(stage));
    };
    return HomeUI;
}(AbstractUI));
egret.registerClass(HomeUI,'HomeUI');
//# sourceMappingURL=HomeUI.js.map