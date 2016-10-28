var EntityDisplays = (function () {
    function EntityDisplays() {
        this._displays = [];
        this._suitablities = [];
        this._defaultDisplay = null;
    }
    var d = __define,c=EntityDisplays,p=c.prototype;
    p.addBitmap = function (name, action) {
        var bm = new egret.Bitmap();
        bm.texture = RES.getRes(name);
        this._addAll(bm, action);
        return bm;
    };
    p.addClip = function (name, action) {
        var data = RES.getRes(name + "_json");
        var texture = RES.getRes(name + "_png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        var clip = new egret.MovieClip();
        var mcd = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
        this._addAll(clip, action);
        return clip;
    };
    p._addAll = function (display, action) {
        if (action) {
            if (egret.getQualifiedClassName(action) == "Array") {
                for (var i = 0; i < action.length; i++) {
                    this._addOne(display, this._actionToIndex(action[i]));
                }
            }
            else {
                this._addOne(display, this._actionToIndex(action));
            }
        }
        else {
            this._defaultDisplay = display;
        }
    };
    p._addOne = function (display, idx) {
        var suitablities = [];
        suitablities[EntityDirection.north] = [5, 3, 1, 0, 0, 0, 1, 3];
        suitablities[EntityDirection.east] = [1, 2, 5, 2, 1, -2, -4, -2];
        suitablities[EntityDirection.south] = [0, 0, 1, 3, 5, 3, 1, 0];
        suitablities[EntityDirection.west] = [1, -2, -4, -2, 1, 2, 5, 2];
        var direction = idx >> 3;
        var state = idx % 8;
        for (var dir = EntityDirection.north; dir <= EntityDirection.northwest; dir++) {
            var i = (dir << 3) + state;
            if (!this._suitablities[i]) {
                this._suitablities[i] = 0;
            }
            var suit = suitablities[direction][dir];
            if (Math.abs(suit) > Math.abs(this._suitablities[i])) {
                this._displays[i] = [display];
                this._suitablities[i] = suit;
            }
            else if (Math.abs(suit) == Math.abs(this._suitablities[i])) {
                if (this._displays[i]) {
                    this._displays[i].push(display);
                }
                else {
                    this._displays[i] = [display];
                }
                this._suitablities[i] = suit;
            }
        }
    };
    p.getDisplay = function (direction, state, index) {
        if (index === void 0) { index = 0; }
        var idx = (direction << 3) + state;
        if (!this._displays[idx]) {
            //没有资源，则显示缺省资源
            return this._defaultDisplay;
        }
        if (!this._displays[idx][index]) {
            index = 0;
        }
        var display = this._displays[idx][index];
        if (this._suitablities[idx] < 0) {
            display.scaleX = -1;
        }
        return display;
    };
    p._actionToIndex = function (action) {
        var table = {
            idle: 0,
            building: 1,
            moving: 2,
            guarding: 3,
            fighting: 4,
            dying: 5,
            dead: 6,
            north: 0,
            northeast: 1,
            east: 2,
            southeast: 3,
            south: 4,
            southwest: 5,
            west: 6,
            northwest: 7
        };
        var idx = 0;
        var actions = action.split("-");
        for (var i = 0; i < actions.length; i++) {
            idx = (idx << 3) + table[actions[i]];
        }
        return idx;
    };
    return EntityDisplays;
}());
egret.registerClass(EntityDisplays,'EntityDisplays');
//# sourceMappingURL=EntityDisplays.js.map