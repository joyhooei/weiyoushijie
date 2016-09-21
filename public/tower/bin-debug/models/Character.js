var Character = (function () {
    function Character(properties) {
        this._properties = properties;
    }
    var d = __define,c=Character,p=c.prototype;
    p.getProperties = function () {
        return this._properties;
    };
    Character.createAll = function () {
        var characters = new Array();
        var config = [
            //name, properties
            { name: 'Sunwukong', properties: { hp: 245, forceHigh: 10, forceLow: 6, armor: 15, idleTicks: 20 * application.frameRate, guardRadius: 50 } },
            { name: 'Reinforce', properties: { hp: 245, force: 6, armor: 0, liveTicks: 20 * application.frameRate, guardRadius: 40 } },
            { name: 'Fireball', properties: { force: 6, moveSpeed: 5 } },
        ];
        for (var i = 0; i < config.length; i++) {
            var d = config[i];
            characters[d.name] = new Character(d.properties);
        }
        return characters;
    };
    return Character;
}());
egret.registerClass(Character,'Character');
//# sourceMappingURL=Character.js.map