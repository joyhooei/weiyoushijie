var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        _super.call(this, "homeUISkin");
        this._paths = [
            [[327, 95], [337, 142], [276, 157], [211, 189], [143, 126]],
            [[100, 92], [40, 170]],
            [[58, 242], [131, 300]],
            [[228, 297], [303, 262]],
            [[320, 186], [486, 119]],
            [[526, 152], [474, 247]],
            [[569, 272], [636, 269]],
            [[720, 239], [777, 221], [796, 289]],
            [[898, 273], [1031, 286]],
            [[1103, 232], [1137, 189], [1033, 191]],
            [[1011, 147], [1154, 139]],
            [[1212, 98], [1169, 23], [977, 64]],
            [[881, 109], [838, 150]],
            [[727, 168], [592, 150], [640, 96]]
        ];
        this._battles = [
            [281, 28], [112, 55], [7, 174], [137, 242], [275, 187],
            [490, 86], [483, 251], [643, 194], [809, 234], [1041, 236],
            [951, 155], [1149, 111], [882, 38], [736, 107], [643, 36]
        ];
        application.dao.addEventListener("Result", function (evt) {
            var result = evt.data;
            if (result.result == 1) {
                var i = Math.min(this._battles.length, result.stage);
                this._battleItems[i - 1].unlock();
                this._drawPathSlowly(i);
            }
        }, this);
    }
    var d = __define,c=HomeUI,p=c.prototype;
    p.onRefresh = function () {
        var self = this;
        self._battleItems = [];
        for (var i = 0; i < self._battles.length; i++) {
            var item = new BattleItem(i + 1);
            item.x = self._battles[i][0];
            item.y = self._battles[i][1];
            self._battleItems.push(item);
        }
        self._shapePath = new egret.Shape();
        self._shapePath.x = self.imgBg.x;
        self._shapePath.y = self.imgBg.y;
        self._shapePath.width = self.imgBg.width;
        self._shapePath.height = self.imgBg.height;
        application.dao.fetch("Result", { customer_id: application.me.attrs.id, result: 1 }, { order: 'stage DESC', limit: 1 }).then(function (results) {
            self.grpMap.addChild(self._shapePath);
            self._battleItems[0].unlock();
            self.grpMap.addChild(self._battleItems[0]);
            if (results.length > 0) {
                var maxStage = Math.min(self._battles.length, results[0].stage);
                for (var i = 1; i < self._battles.length; i++) {
                    self.grpMap.addChild(self._battleItems[i]);
                    if (i < maxStage) {
                        self._battleItems[i].unlock();
                        self._drawPathQuckly(i + 1, 0);
                    }
                    else {
                        self._drawPathQuckly(i + 1, 0xA9A9A9);
                    }
                }
            }
        });
    };
    p._drawPathQuckly = function (toStage, color) {
        var path = this._paths[toStage - 2];
        if (path) {
            for (var i = 0; i < path.length - 1; i++) {
                var t = 0;
                var bezier = this._createCubicBezier(path, i);
                if (i == 0) {
                    this._drawPoint(bezier.get(0), color);
                }
                while (t < 1) {
                    t = this._drawPathPoint(bezier, t, color);
                }
                ;
            }
        }
    };
    p._drawPathSlowly = function (toStage) {
        var self = this;
        var path = this._paths[toStage - 2];
        if (path) {
            var i_1 = 0;
            var t_1 = 0;
            var bezier_1 = self._createCubicBezier(path, i_1);
            self._drawPoint(bezier_1.get(0), 0);
            var interval_1 = setInterval(function () {
                if (t_1 < 1) {
                    t_1 = self._drawPathPoint(bezier_1, t_1, 0);
                }
                else {
                    i_1 += 1;
                    if (i_1 >= path.length - 1) {
                        clearInterval(interval_1);
                    }
                    else {
                        t_1 = 0;
                        bezier_1 = this._createCubicBezier(path, i_1);
                    }
                }
            }, 100);
        }
    };
    p._createCubicBezier = function (path, i) {
        var cps = CubicBezier.getCtrlPoints(path, i);
        return new CubicBezier([path[i], cps[0], cps[1], path[i + 1]]);
    };
    p._drawPathPoint = function (bezier, t, color) {
        var last = bezier.get(t);
        while (t <= 1) {
            t = t + 0.01;
            var pt = bezier.get(t);
            var distance = Math.round(Math.pow(last[0] - pt[0], 2) + Math.pow(last[1] - pt[1], 2));
            if (distance >= 64) {
                this._drawPoint(pt, color);
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
    return HomeUI;
}(AbstractUI));
egret.registerClass(HomeUI,'HomeUI');
//# sourceMappingURL=HomeUI.js.map