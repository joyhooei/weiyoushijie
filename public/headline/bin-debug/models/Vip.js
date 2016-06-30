var Vip = (function () {
    function Vip(level, charge, output, hit, time, upgrade, patch) {
        //级别
        this._level = 0;
        //充值
        this._charge = 0;
        //总秒产加成
        this._output = 0;
        //暴击收益
        this._hit = 10;
        //时光沙漏获得收益增加
        this._time = 0;
        //升级费用减少
        this._upgrade = 0;
        //勋章碎片
        this._patch = 0;
        this._level = level;
        this._charge = charge;
        this._output = output;
        this._hit = hit;
        this._time = time;
        this._upgrade = upgrade;
        this._patch = patch;
    }
    var d = __define,c=Vip,p=c.prototype;
    Vip.createVip = function (charge) {
        var data = [
            [0, 0, 0, 10, 0, 0, 0],
            [1, 2, 0.2, 10, 0, 0, 0],
            [2, 10, 0.5, 10, 0, 0, 0],
            [3, 20, 1, 15, 0, 0, 0],
            [4, 30, 2, 20, 0, 0, 0],
            [5, 50, 5, 25, 0.5, 0, 1],
            [6, 100, 10, 30, 0.7, 0.9, 1],
            [7, 200, 50, 35, 1, 0.9, 1],
            [8, 300, 100, 40, 1.2, 0.99, 1],
            [9, 500, 500, 45, 1.5, 0.99, 2],
            [10, 800, 800, 50, 1.7, 0.999, 2],
            [11, 1000, 1000, 55, 2, 0.999, 2],
            [12, 2000, 5000, 60, 2.2, 0.9999, 2],
            [13, 5000, 50000, 65, 2.5, 0.9999, 2],
            [14, 10000, 1000000, 70, 3, 0.99999, 3],
            [15, 15000, 10000000, 75, 3.5, 0.99999, 3],
        ];
        var d = null;
        for (var i = 0; i < data.length; i++) {
            if (charge >= data[i][1]) {
                d = data[i];
            }
            else {
                break;
            }
        }
        return new Vip(d[0], d[1], d[2], d[3], d[4], d[5], d[6]);
    };
    p.getOutput = function (output) {
        return output * (1 + this._output);
    };
    p.getHit = function (gold) {
        return gold * this._hit;
    };
    p.getHitRatio = function () {
        return this._hit;
    };
    p.getTime = function (gold) {
        return gold * (1 + this._time);
    };
    p.getUpgrade = function (price) {
        return price * (1 - this._upgrade);
    };
    p.getLevel = function () {
        return this._level;
    };
    return Vip;
}());
egret.registerClass(Vip,'Vip');
