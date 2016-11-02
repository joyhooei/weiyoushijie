var EntityDisplays = (function () {
    function EntityDisplays() {
        this._displays = [];
        this._suitablities = [];
        this._default = null;
    }
    var d = __define,c=EntityDisplays,p=c.prototype;
    p.addBitmap = function (name, action) {
        var bm = EntityDisplays.loadBitmap(name);
        this._addAll(bm, action);
        return bm;
    };
    p.addClip = function (name, action) {
        var clip = EntityDisplays.loadClip(name);
        this._addAll(clip, action);
        return clip;
    };
    EntityDisplays.loadBitmap = function (name) {
        var bm = new egret.Bitmap();
        bm.texture = RES.getRes(name);
        return bm;
    };
    EntityDisplays.loadClip = function (name) {
        var data = RES.getRes(name + "_json");
        var texture = RES.getRes(name + "_png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        var clip = new egret.MovieClip();
        var mcd = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
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
            this._default = display;
        }
    };
    p._addOne = function (display, idx) {
        var direction = idx >> 3;
        var state = idx % 8;
        for (var dir = EntityDirection.north; dir <= EntityDirection.northwest; dir++) {
            var i = (dir << 3) + state;
            var oldSuit = this._suitablities[i] || 0;
            var newSuit = EntityDisplays.suitablities[direction >> 1][dir];
            if (newSuit > oldSuit) {
                this._displays[i] = [display];
                this._suitablities[i] = newSuit;
            }
            else if (newSuit == oldSuit) {
                if (this._displays[i]) {
                    this._displays[i].push(display);
                }
                else {
                    this._displays[i] = [display];
                }
                this._suitablities[i] = newSuit;
            }
        }
    };
    p.has = function (state) {
        for (var i = EntityDirection.north; i <= EntityDirection.northwest; i++) {
            var idx = (i << 3) + state;
            if (this._displays[idx]) {
                return true;
            }
        }
        return false;
    };
    p.getDisplay = function (direction, state, index) {
        if (index === void 0) { index = 0; }
        var idx = (direction << 3) + state;
        if (!this._displays[idx]) {
            //没有资源，则显示缺省资源
            return this._default;
        }
        if (!this._displays[idx][index]) {
            index = 0;
        }
        var display = this._displays[idx][index];
        if (this._suitablities[idx] % 2 == 1) {
            display.scaleX = -1;
        }
        else {
            display.scaleX = 1;
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
    //6：完全匹配
    //5：镜像完全匹配
    //4：45度匹配
    //3：镜像45度匹配
    //2：90度匹配
    //1：镜像90度匹配（不存在）
    //0：不匹配
    EntityDisplays.suitablities = [
        //north
        [6, 4, 2, 0, 0, 0, 2, 4],
        //east
        [2, 4, 6, 4, 2, 3, 5, 3],
        //south
        [0, 0, 2, 4, 6, 4, 2, 0],
        //west
        [2, 3, 5, 3, 2, 4, 6, 4]
    ];
    return EntityDisplays;
}());
egret.registerClass(EntityDisplays,'EntityDisplays');
//# sourceMappingURL=EntityDisplays.js.map