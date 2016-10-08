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
            //battle
            { name: 'Battle1', properties: { lives: 20, golds: 1000, heroWinned: 'Sunwukong' } },
            { name: 'Battle2', properties: { lives: 20, golds: 1000, heroWinned: 'Zhubajie' } },
            { name: 'Battle3', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle4', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle5', properties: { lives: 20, golds: 1000, heroWinned: 'Shaseng' } },
            { name: 'Battle6', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle7', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle8', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle9', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle10', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle11', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle12', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle13', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle14', properties: { lives: 20, golds: 1000 } },
            { name: 'Battle15', properties: { lives: 20, golds: 1000 } },
            //heros
            { name: 'Sunwukong', properties: { hp: 245, forceHigh: 10, forceLow: 6, armor: 15, cureSpeed: 1, moveSpeed: 1, idleTicks: 20 * application.frameRate, guardRadius: 50, guardAltitude: [-1, 0] } },
            { name: 'Zhubajie', properties: { hp: 245, forceHigh: 10, forceLow: 6, armor: 15, cureSpeed: 1, moveSpeed: 1, idleTicks: 20 * application.frameRate, guardRadius: 50, guardAltitude: [-1, 0] } },
            { name: 'Shaheshang', properties: { hp: 245, forceHigh: 10, forceLow: 6, armor: 15, cureSpeed: 1, moveSpeed: 1, idleTicks: 20 * application.frameRate, guardRadius: 50, guardAltitude: [-1, 0] } },
            //soldiers
            { name: 'Reinforce', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, liveTicks: 20 * application.frameRate, guardRadius: 40, guardAltitude: [-1, 0] } },
            { name: 'Warrior', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, liveTicks: 8 * application.frameRate, guardRadius: 40, guardAltitude: [-1, 0] } },
            //tower soldiers
            { name: 'Soldier1', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'Soldier2', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'Soldier3', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'Soldier4', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'Soldier5', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'BombSoldier1', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'BombSoldier2', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'BombSoldier3', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'BombSoldier4', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'BombSoldier5', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0] } },
            { name: 'ArrowSoldier1', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0, 1] } },
            { name: 'ArrowSoldier2', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0, 1] } },
            { name: 'ArrowSoldier3', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0, 1] } },
            { name: 'ArrowSoldier4', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0, 1] } },
            { name: 'ArrowSoldier5', properties: { hp: 100, force: 6, armor: 0, cureSpeed: 1, moveSpeed: 1, guardAltitude: [-1, 0, 1] } },
            //tower
            { name: 'SoldierTower1', properties: { guardRadius: 100 } },
            { name: 'SoldierTower2', properties: { guardRadius: 100 } },
            { name: 'SoldierTower3', properties: { guardRadius: 100 } },
            { name: 'SoldierTower4', properties: { guardRadius: 100 } },
            { name: 'SoldierTower5', properties: { guardRadius: 100 } },
            { name: 'BombTower1', properties: { guardRadius: 100 } },
            { name: 'BombTower2', properties: { uardRadius: 100 } },
            { name: 'BombTower3', properties: { guardRadius: 100 } },
            { name: 'BombTower4', properties: { guardRadius: 100 } },
            { name: 'BombTower5', properties: { guardRadius: 100 } },
            { name: 'ArrowTower1', properties: { guardRadius: 100 } },
            { name: 'ArrowTower2', properties: { guardRadius: 100 } },
            { name: 'ArrowTower3', properties: { guardRadius: 100 } },
            { name: 'ArrowTower4', properties: { guardRadius: 100 } },
            { name: 'ArrowTower5', properties: { guardRadius: 100 } },
            //enemies
            { name: 'Hogs', properties: { bonus: 10, hp: 100, force: 6, cureSpeed: 0, moveSpeed: 1, idleTick: 0, dyingTicks: 10 } },
            { name: 'Rhino', properties: { bonus: 10, hp: 100, force: 6, cureSpeed: 0, moveSpeed: 1, idleTick: 0, dyingTicks: 10 } },
            { name: 'Wolf', properties: { bonus: 10, hp: 100, force: 6, cureSpeed: 0, moveSpeed: 1, idleTick: 0, dyingTicks: 10 } },
            //bullets
            { name: 'Fireball', properties: { force: 6, hitRadius: 10, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Bomb1', properties: { force: 6, hitRadius: 10, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Bomb2', properties: { force: 6, hitRadius: 10, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Bomb3', properties: { force: 6, hitRadius: 10, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Bomb4', properties: { force: 6, hitRadius: 10, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Bomb5', properties: { force: 6, hitRadius: 10, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Arrow1', properties: { force: 6, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Arrow2', properties: { force: 6, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Arrow3', properties: { force: 6, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Arrow4', properties: { force: 6, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
            { name: 'Arrow5', properties: { force: 6, moveSpeed: 5, idleTick: 0, dyingTicks: 10 } },
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