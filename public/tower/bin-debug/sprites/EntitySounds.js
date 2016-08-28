var EntitySounds = (function () {
    function EntitySounds() {
        this._sounds = [];
    }
    var d = __define,c=EntitySounds,p=c.prototype;
    p.add = function (sound, state) {
        this._sounds[state] = sound;
    };
    p.play = function (state) {
        var name = this._sounds[state];
        if (name) {
            var sound_eff = RES.getRes(name);
            sound_eff.type = egret.Sound.EFFECT;
            sound_eff.play();
        }
    };
    return EntitySounds;
}());
egret.registerClass(EntitySounds,'EntitySounds');
//# sourceMappingURL=EntitySounds.js.map