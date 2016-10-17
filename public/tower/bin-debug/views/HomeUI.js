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
                this._showBattle(Math.min(15, result.stage + 1));
            }
        }, self);
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
                    self._showBattle(i);
                }
            }
        });
    };
    p._showBattle = function (i) {
        if (this._battles[i].visible == false) {
            this._battles[i].visible = true;
            this._drawPath(i);
        }
    };
    p._drawPath = function (i) {
        var self = this;
        var x0 = this._battles[i - 1].x + this._battles[i - 1].width / 2;
        var y0 = this._battles[i - 1].y + this._battles[i - 1].height / 2;
        var x1 = this._battles[i].x + this._battles[i].width / 2;
        var y1 = this._battles[i].y + this._battles[i].height / 2;
        var xc = x0 + (x1 - x0) / 2;
        var yc = y0 + (y1 - y0) / 2 - 50;
        var bezier = new CubicBezier(x0, y0, xc, yc, xc, yc, x1, y1);
        var last = bezier.get(0);
        var t = 0;
        var interval = setInterval(function () {
            t = t + 0.01;
            if (t > 1) {
                clearInterval(interval);
                return;
            }
            var pt = bezier.get(t);
            self._shapePath.graphics.beginFill(0xFF0000, 1);
            var distance = Math.round(Math.sqrt(Math.pow(last[0] - pt[0], 2) + Math.pow(last[1] - pt[1], 2)));
            if (distance >= 12) {
                self._shapePath.graphics.drawCircle(pt[0], pt[1], 4);
                last = pt;
            }
            self._shapePath.graphics.endFill();
        }, 50);
    };
    p._startBattle = function (stage) {
        this.show(new BattleLoadingUI(stage));
    };
    return HomeUI;
}(AbstractUI));
egret.registerClass(HomeUI,'HomeUI');
//# sourceMappingURL=HomeUI.js.map