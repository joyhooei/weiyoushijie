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
            //heros
            { name: 'Sunwukong', properties: { hp: 245, forceHigh: 10, forceLow: 6, armor: 15, cureSpeed: 1, moveSpeed: 1, idleTicks: 20 * application.frameRate, guardRadius: 50 } },
            //soldiers
            { name: 'Reinforce', properties: { hp: 245, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, liveTicks: 20 * application.frameRate, guardRadius: 40 } },
            { name: 'Soldier1', properties: { hp: 245, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardRadius: 40 } },
            { name: 'Soldier2', properties: { hp: 245, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardRadius: 40 } },
            { name: 'Soldier3', properties: { hp: 245, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardRadius: 40 } },
            { name: 'Soldier4', properties: { hp: 245, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardRadius: 40 } },
            { name: 'Soldier5', properties: { hp: 245, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardRadius: 40 } },
            { name: 'Warrior', properties: { hp: 245, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, liveTicks: 8 * application.frameRate, guardRadius: 40 } },
            //enemies
            { name: 'Hogs', properties: { bonus: 10, hp: 100, force: 6, cureSpeed: 0, moveSpeed: 1, idleTick: 0, dyingTicks: 10 } },
            { name: 'Rhino', properties: { bonus: 10, hp: 100, force: 6, cureSpeed: 0, moveSpeed: 1, idleTick: 0, dyingTicks: 10 } },
            { name: 'Wolf', properties: { bonus: 10, hp: 100, force: 6, cureSpeed: 0, moveSpeed: 1, idleTick: 0, dyingTicks: 10 } },
            //bullets
            { name: 'Fireball', properties: { force: 6, hitRadius: 10, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
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