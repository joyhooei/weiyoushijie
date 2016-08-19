var EntityDisplays = (function () {
    function EntityDisplays() {
        this._displays = [];
        this._keys = [];
        this._currentDisplay = null;
        this._defaultDisplay = null;
    }
    var d = __define,c=EntityDisplays,p=c.prototype;
    p.add = function (display, options) {
        this._displays.push(display);
        this._keys.push(options);
    };
    p.setDefault = function (display) {
        this._defaultDisplay = display;
    };
    p.render = function (container, options) {
        var display = this._getDisplay(options);
        if (display && display != this._currentDisplay) {
            if (this._currentDisplay) {
                container.removeChild(this._currentDisplay);
            }
            container.addChild(display);
            if (egret.getQualifiedClassName(display) == "MovieClip") {
                display.play();
            }
            this._currentDisplay = display;
            return true;
        }
        else {
            return false;
        }
    };
    p._getDisplay = function (options) {
        var display = null;
        var suitable = 0;
        for (var i = 0; i < this._keys.length; i++) {
            var s = this._suitable(options, this._keys[i]);
            if (s > suitable) {
                display = this._displays[i];
                suitable = s;
            }
        }
        if (display) {
            return display;
        }
        else {
            return this._defaultDisplay;
        }
    };
    p._suitable = function (options, keys) {
        var suitable = 0;
        for (var key in options) {
            if (keys.hasOwnProperty(key)) {
                if (keys[key] == options[key]) {
                    if (key == "direction") {
                        suitable += 2;
                    }
                    else {
                        suitable += 1;
                    }
                }
                else {
                    return 0;
                }
            }
        }
        return suitable;
    };
    return EntityDisplays;
}());
egret.registerClass(EntityDisplays,'EntityDisplays');
//# sourceMappingURL=EntityDisplays.js.map