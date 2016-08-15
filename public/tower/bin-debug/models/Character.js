var Character = (function () {
    function Character(properties, mcs, factory) {
        this._properties = properties;
        this._mcs = mcs;
        this._factory = factory;
    }
    var d = __define,c=Character,p=c.prototype;
    p.getProperties = function () {
        return this._properties;
    };
    p.getMCs = function () {
        var mcs = [];
        for (var j = 0; j < this._mcs.length; j++) {
            var mc = new egret.MovieClip(this._factory.generateMovieClipData(this._mcs[j]));
            mc.frameRate = application.frameRate;
            mcs.push(mc);
        }
        return mcs;
    };
    Character.createAll = function () {
        var characters = new Array();
        var config = [];
        var data = RES.getRes("animation.json");
        var txtr = RES.getRes("animation.png");
        var factory = new egret.MovieClipDataFactory(data, txtr);
        for (var i = 0; i < config.length; i++) {
            var d = config[i];
            characters[d.name] = new Character(d.properties, d.mcs, factory);
        }
        return characters;
    };
    return Character;
}());
egret.registerClass(Character,'Character');
//# sourceMappingURL=Character.js.map