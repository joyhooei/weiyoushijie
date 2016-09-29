var EntityDisplays = (function () {
    function EntityDisplays() {
        this._displays = [];
        this._defaultDisplay = null;
    }
    var d = __define,c=EntityDisplays,p=c.prototype;
    p.addBitmap = function (name, action) {
        var bm = new egret.Bitmap();
        bm.texture = RES.getRes(name);
        if (action) {
            if (egret.getQualifiedClassName(action) == "Array") {
                for (var i = 0; i < action.length; i++) {
                    var idx = this._actionToIndex(action[i]);
                    this._displays[idx] = [bm];
                }
            }
            else {
                var idx = this._actionToIndex(action);
                this._displays[idx] = [bm];
            }
        }
        else {
            this._defaultDisplay = bm;
        }
        return bm;
    };
    p.addClip = function (name, action) {
        var data = RES.getRes(name + "_json");
        var texture = RES.getRes(name + "_png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        var clip = new egret.MovieClip();
        var mcd = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
        if (action) {
            if (egret.getQualifiedClassName(action) == "Array") {
                for (var i = 0; i < action.length; i++) {
                    var idx = this._actionToIndex(action[i]);
                    if (this._displays[idx]) {
                        this._displays[idx].push(clip);
                    }
                    else {
                        this._displays[idx] = [clip];
                    }
                }
            }
            else {
                var idx = this._actionToIndex(action);
                if (this._displays[idx]) {
                    this._displays[idx].push(clip);
                }
                else {
                    this._displays[idx] = [clip];
                }
            }
        }
        else {
            this._defaultDisplay = clip;
        }
        return clip;
    };
    p.getDisplay = function (direction, state, index) {
        if (index === void 0) { index = 0; }
        var scaleX = 1;
        var scaleY = 1;
        var idx = (direction << 3) + state;
        if (!this._displays[idx]) {
            //是否有镜像的资源
            idx = (((direction + 4) % 8) << 3) + state;
            if (!this._displays[idx]) {
                idx = state;
                if (!this._displays[idx]) {
                    //没有当前方向的资源，也没有镜像资源，则显示缺省资源
                    return this._defaultDisplay;
                }
            }
            else {
                if (direction == EntityDirection.east || direction == EntityDirection.west) {
                    scaleX = -1;
                }
                else {
                    scaleY = -1;
                }
            }
        }
        if (!this._displays[idx][index]) {
            index = 0;
        }
        var display = this._displays[idx][index];
        display.scaleX = scaleX;
        display.scaleY = scaleY;
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