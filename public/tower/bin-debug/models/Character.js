var Character = (function () {
    function Character(properties) {
        this._properties = properties;
        this._mcs = new Array();
    }
    var d = __define,c=Character,p=c.prototype;
    p.getProperty = function (name) {
        return this._properties[name];
    };
    p.addMC = function (mc, direction, state) {
        this._mcs[state][direction] = mc;
    };
    p.getMC = function (direction, state) {
        var mc = this._mcs[state][direction];
        if (!mc) {
            for (var i = 0; i < this._mcs[state].length; i++) {
                if (this._mcs[state][i]) {
                    return this._mcs[state][i];
                }
            }
        }
        return mc;
    };
    Character.createAll = function () {
        var characters = new Array();
        var config = [];
        var data = RES.getRes("animation.json");
        var txtr = RES.getRes("animation.png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        for (var i = 0; i < config.length; i++) {
            var d = config[i];
            var character = new Character(d.name);
            for (var j = 0; j < d.mcs.length; j++) {
                var mc = new egret.MovieClip(mcFactory.generateMovieClipData(d.mcs[j].name));
                character.addMC(mc, d.mcs[j].dir, d.mcs[j].state);
            }
            characters[d.name] = character;
        }
        return characters;
    };
    return Character;
}());
egret.registerClass(Character,'Character');
//# sourceMappingURL=Character.js.map