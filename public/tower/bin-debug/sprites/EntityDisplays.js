var EntityDisplays = (function () {
    function EntityDisplays() {
        this._displays = [];
        this._currentDisplay = null;
        this._defaultDisplay = null;
    }
    var d = __define,c=EntityDisplays,p=c.prototype;
    p._add = function (display, action) {
        if (action) {
            this._displays[this._actionToIndex(action)] = display;
        }
        if (!this._defaultDisplay) {
            this._defaultDisplay = display;
        }
    };
    p.addBitmap = function (name, action) {
        var bm = new egret.Bitmap();
        bm.texture = RES.getRes(name + "_png");
        this._add(bm, action);
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
            this._add(clip, action);
        }
        else {
            for (var i = 0; i < mcd.labels.length; i++) {
                var label = mcd.labels[i];
                this._add(clip, label);
            }
        }
        return this;
    };
    p.render = function (container, direction, state) {
        var display = this._getDisplay(direction, state);
        if (display) {
            if (display != this._currentDisplay) {
                if (this._currentDisplay) {
                    container.removeChild(this._currentDisplay);
                }
                if (display) {
                    container.addChild(display);
                }
                this._currentDisplay = display;
            }
            return true;
        }
        else {
            return false;
        }
    };
    /*
    */
    p._getDisplay = function (direction, state) {
        var display = null;
        var idx = direction << 3 + state;
        if (this._displays[idx]) {
            display = this._displays[idx];
            if (egret.getQualifiedClassName(display) == "MovieClip") {
                display.gotoAndPlay(this._indexToAction(idx));
            }
        }
        else {
            if (direction == 0) {
                display = this._defaultDisplay;
                if (egret.getQualifiedClassName(display) == "MovieClip") {
                    display.play();
                }
            }
            else {
                display = this._getDisplay(0, state);
            }
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
            idx = idx << 3 + table[actions[i]];
        }
        return idx;
    };
    p._indexToAction = function (idx) {
        var directions = ["idle", "building", "moving", "guarding", "fighting", "dying", "dead"];
        var states = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];
        if (idx >= 8) {
            return directions[idx >> 3] + "-" + states[idx % 8];
        }
        else {
            return states[idx % 8];
        }
    };
    return EntityDisplays;
}());
egret.registerClass(EntityDisplays,'EntityDisplays');
//# sourceMappingURL=EntityDisplays.js.map