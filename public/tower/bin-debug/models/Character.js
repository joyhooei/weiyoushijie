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
            { name: 'MonkeyKing', properties: { hp: 1000, damage: 40, guardRadius: 50 } },
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