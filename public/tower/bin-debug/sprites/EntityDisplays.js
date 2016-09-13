var EntityDisplays = (function () {
    function EntityDisplays(entityName) {
        this._displays = [];
        this._labels = [];
        this._currentDisplay = null;
        this._defaultDisplay = null;
        this._entityName = entityName;
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
        if (this._currentDisplay) {
            container.removeChild(this._currentDisplay);
        }
        var display = this._getDisplay(direction, state, index);
        if (display) {
            container.addChild(display);
            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                container.x = display.width >> 1;
                container.y = display.height >> 1;
            }
            else {
                container.x = 0;
                container.y = 0;
            }
        }
        else {
            console.error("display dosn't exist for " + this._entityName + " direction = " + Entity.directionName(direction) + " state = " + Entity.stateName(state));
        }
        this._currentDisplay = display;
        return display;
    };
    p._playClip = function (display, label) {
        if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
            var clip = display;
            clip.frameRate = 8;
            if (label) {
                clip.gotoAndPlay(label, -1);
            }
            else {
                clip.gotoAndPlay(0, -1);
            }
        }
        return display;
    };
    p._getDisplay = function (direction, state, index) {
        if (index === void 0) { index = 0; }
        var scaleX = 1;
        var scaleY = 1;
        var idx = (direction << 3) + state;
        if (!this._displays[idx]) {
            //是否有镜像的资源
            idx = (((direction + 4) % 8) << 3) + state;
            if (!this._displays[idx]) {
                //是否有方向相近的资源
                idx = (((direction + 1) % 8) << 3) + state;
                if (!this._displays[idx]) {
                    idx = (((direction + 7) % 8) << 3) + state;
                    if (!this._displays[idx]) {
                        idx = state;
                        if (!this._displays[idx]) {
                            return this._playClip(this._defaultDisplay);
                        }
                    }
                }
            }
            else {
                if (direction == EntityDirection.east || direction == EntityDirection.west) {
                    scaleX = -1;
                }
                else if (direction == EntityDirection.north || direction == EntityDirection.south) {
                    scaleY = -1;
                }
                else {
                    scaleX = -1;
                    scaleY = -1;
                }
            }
        }
        if (!this._displays[idx][index]) {
            index = 0;
        }
        var display = this._displays[idx][index];
        if (this._labels[idx] && this._labels[idx][index] && this._labels[idx][index].length > 0) {
            this._playClip(display, this._labels[idx][index]);
        }
        else {
            this._playClip(display);
        }
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