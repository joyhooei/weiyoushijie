var EntityDisplays = (function () {
    function EntityDisplays() {
        this._displays = [];
        this._labels = [];
        this._currentDisplay = null;
        this._defaultDisplay = null;
    }
    var d = __define,c=EntityDisplays,p=c.prototype;
    p.addBitmap = function (name, action) {
        var bm = new egret.Bitmap();
        bm.texture = RES.getRes(name + "_png");
        if (action) {
            var idx = this._actionToIndex(action);
            this._displays[idx] = [bm];
        }
        else {
            this._defaultDisplay = bm;
        }
        return this;
    };
    p.addClip = function (name, action) {
        var data = RES.getRes(name + "_json");
        var texture = RES.getRes(name + "_png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        var clip = new egret.MovieClip();
        var mcd = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
        if (action) {
            var idx = this._actionToIndex(action);
            if (this._displays[idx]) {
                this._displays[idx].push(clip);
            }
            else {
                this._displays[idx] = [clip];
            }
        }
        else if (mcd.labels) {
            for (var i = 0; i < mcd.labels.length; i++) {
                action = mcd.labels[i].name;
                var idx = this._actionToIndex(action);
                if (this._displays[idx]) {
                    this._displays[idx].push(clip);
                    this._labels[idx].push(action);
                }
                else {
                    this._displays[idx] = [clip];
                    this._labels[idx] = [action];
                }
            }
        }
        else {
            this._defaultDisplay = clip;
        }
        return this;
    };
    p.render = function (container, direction, state, index) {
        if (index === void 0) { index = 0; }
        var display = this._getDisplay(direction, state, index);
        if (this._currentDisplay != display) {
            if (this._currentDisplay) {
                container.removeChild(this._currentDisplay);
            }
            if (display) {
                display.width = container.width;
                display.height = container.height;
                container.addChild(display);
            }
            this._currentDisplay = display;
        }
        return display;
    };
    p._getDisplay = function (direction, state, index) {
        if (index === void 0) { index = 0; }
        var display = null;
        var idx = (direction << 3) + state;
        if (this._displays[idx] && this._displays[idx][0]) {
            if (!this._displays[idx][index]) {
                index = 0;
            }
            display = this._displays[idx][index];
            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                var clip = display;
                var label = this._labels[idx][index];
                if (label && label.length > 0) {
                    clip.gotoAndPlay(label, -1);
                }
                else {
                    clip.gotoAndPlay(0, -1);
                }
            }
        }
        else if (direction == 0) {
            display = this._defaultDisplay;
            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                var clip = display;
                clip.gotoAndPlay(0, -1);
            }
        }
        else {
            display = this._getDisplay(0, state);
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