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
            { name: 'Battle2', properties: { lives: 20, golds: 10000, heroWinned: 'Zhubajie' } },
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
            //英雄
            { name: 'Sunwukong', properties: { hp: 245, forceHigh: 10, forceLow: 6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed: 1, moveSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate, guardRadius: 50, guardAltitude: [-1, 0] } },
            { name: 'Zhubajie', properties: { hp: 245, forceHigh: 10, forceLow: 6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed: 1, moveSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate, guardRadius: 50, guardAltitude: [-1, 0] } },
            { name: 'Shaseng', properties: { hp: 245, forceHigh: 10, forceLow: 6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed: 1, moveSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate, guardRadius: 50, guardAltitude: [-1, 0] } },
            //soldiers
            { name: 'Reinforce', properties: { hp: 100, force: 6, armor: 0, magicArmor: 0, cureSpeed: 1, moveSpeed: 1, idleTicks: 0, liveTicks: 20 * application.frameRate, dyingTicks: application.frameRate, guardRadius: 40, guardAltitude: [-1, 0] } },
            { name: 'Warrior', properties: { hp: 100, force: 6, armor: 0, magicArmor: 0, cureSpeed: 1, moveSpeed: 1, idleTicks: 0, liveTicks: 8 * application.frameRate, dyingTicks: application.frameRate, guardRadius: 40, guardAltitude: [-1, 0] } },
            { name: 'Ghost', properties: { hp: 40, forceHigh: 6, forceLow: 1, armor: 0, magicArmor: 0, cureSpeed: 1, moveSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate, guardRadius: 40, guardAltitude: [-1, 0] } },
            { name: 'WhiteImpermanence', properties: { hp: 80, forceHigh: 10, forceLow: 2, armor: 20, magicArmor: 0, cureSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate, moveSpeed: 1, guardRadius: 40, guardAltitude: [-1, 0] } },
            { name: 'BlackImpermanence', properties: { hp: 250, forceHigh: 10, forceLow: 5, armor: 40, magicArmor: 0, cureSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate, moveSpeed: 1, guardRadius: 40, guardAltitude: [-1, 0] } },
            //守护塔士兵
            { name: 'Soldier1', properties: { hp: 50, force: 3, armor: 0, magicArmor: 0, cureSpeed: 1, moveSpeed: 1, guardRadius: 50, guardAltitude: [-1, 0], idleTicks: 0, dyingTicks: application.frameRate } },
            { name: 'Soldier2', properties: { hp: 50, force: 6, armor: 0, magicArmor: 3, cureSpeed: 1, moveSpeed: 1, guardRadius: 50, guardAltitude: [-1, 0], idleTicks: 0, dyingTicks: application.frameRate } },
            { name: 'Soldier3', properties: { hp: 50, force: 9, armor: 0, magicArmor: 6, cureSpeed: 1, moveSpeed: 1, guardRadius: 50, guardAltitude: [-1, 0], idleTicks: 0, dyingTicks: application.frameRate } },
            { name: 'Soldier4', properties: { hp: 50, force: 12, armor: 0, magicArmor: 9, cureSpeed: 1, moveSpeed: 1, guardRadius: 50, guardAltitude: [-1, 0], idleTicks: 0, dyingTicks: application.frameRate } },
            //小怪
            { name: 'Enemy1', properties: { bonus: 10, hp: 100, force: 6, armor: 0, magicArmor: 0, cureSpeed: 0, moveSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate } },
            { name: 'Enemy4', properties: { bonus: 10, hp: 100, force: 6, armor: 0, magicArmor: 0, cureSpeed: 0, moveSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate } },
            { name: 'Enemy8', properties: { bonus: 10, hp: 100, force: 6, armor: 0, magicArmor: 0, cureSpeed: 0, moveSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate } },
            { name: 'Enemy14', properties: { bonus: 10, hp: 100, force: 6, armor: 0, magicArmor: 0, cureSpeed: 0, moveSpeed: 1, idleTicks: 0, dyingTicks: application.frameRate } },
            //防护塔
            { name: 'SoldierTower1', properties: { force: 3, guardRadius: 160, price: 100, upgradePrice: 100 } },
            { name: 'SoldierTower2', properties: { force: 6, guardRadius: 160, price: 200, upgradePrice: 100 } },
            { name: 'SoldierTower3', properties: { force: 9, guardRadius: 160, price: 300, upgradePrice: 100 } },
            { name: 'SoldierTower4', properties: { force: 12, guardRadius: 160, price: 530 } },
            //炮塔
            { name: 'BombTower1', properties: { force: 20, guardRadius: 160, shootSpeed: Math.round(1.5 * application.frameRate), price: 120, upgradePrice: 150 } },
            { name: 'BombTower2', properties: { force: 30, guardRadius: 180, shootSpeed: Math.round(1.5 * application.frameRate), price: 270, upgradePrice: 150 } },
            { name: 'BombTower3', properties: { force: 40, guardRadius: 200, shootSpeed: Math.round(1.5 * application.frameRate), price: 320, upgradePrice: 230 } },
            { name: 'BombTower4', properties: { force: 30, guardRadius: 220, shootSpeed: Math.round(1.5 * application.frameRate), price: 550 } },
            //箭塔
            { name: 'ArrowTower1', properties: { force: 8, guardRadius: 160, price: 70, upgradePrice: 100 } },
            { name: 'ArrowTower2', properties: { force: 12, guardRadius: 200, price: 170, upgradePrice: 150 } },
            { name: 'ArrowTower3', properties: { force: 16, guardRadius: 240, price: 320, upgradePrice: 230 } },
            { name: 'ArrowTower4', properties: { force: 24, guardRadius: 200, price: 550 } },
            { name: 'ArrowTower5', properties: { force: 24, guardRadius: 200, price: 550 } },
            //魔法塔
            { name: 'MagicTower1', properties: { forceHigh: 17, forceLow: 9, shootSpeed: Math.round(1.5 * application.frameRate), guardRadius: 160, price: 100, upgradePrice: 160 } },
            { name: 'MagicTower2', properties: { forceHigh: 43, forceLow: 23, shootSpeed: Math.round(1.5 * application.frameRate), guardRadius: 180, price: 160, upgradePrice: 240 } },
            { name: 'MagicTower3', properties: { forceHigh: 74, forceLow: 40, shootSpeed: Math.round(1.5 * application.frameRate), guardRadius: 250, price: 240, upgradePrice: 300 } },
            { name: 'MagicTower4', properties: { forceHigh: 70, forceLow: 20, shootSpeed: Math.round(0.8 * application.frameRate), guardRadius: 220, price: 300 } },
            //道具
            { name: 'Fireball', properties: { force: 500, hitType: HitType.normal, hitRadius: 50, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'Freeze', properties: { force: 5, hitType: HitType.normal, hitRadius: 800, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0, curseTicks: 3 * application.frameRate } },
            { name: 'Thunder', properties: { force: 500, hitType: HitType.damage, hitRadius: 50, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            //炮弹
            { name: 'Bomb1', properties: { force: 20, hitType: HitType.normal, hitRadius: 50, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'Bomb2', properties: { force: 30, hitType: HitType.normal, hitRadius: 50, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'Bomb3', properties: { force: 40, hitType: HitType.normal, hitRadius: 50, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 3 * application.frameRate } },
            { name: 'Bomb4', properties: { force: 30, hitType: HitType.normal, hitRadius: 50, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'ScorchedEarth', properties: { hitType: HitType.normal, moveSpeed: 10, force: 20, fightingTicks: 0, idleTicks: 0, dyingTicks: 0 } },
            { name: 'ScorchedEarthBomblet', properties: { hitType: HitType.normal, moveSpeed: 10, force: 20, fightingTicks: 0, idleTicks: 0, dyingTicks: 0 } },
            { name: 'Spike', properties: { hitType: HitType.normal, moveSpeed: 10, force: 20, fightingTicks: 10, idleTicks: 0, dyingTicks: 0 } },
            //弓箭
            { name: 'Arrow1', properties: { force: 8, hitType: HitType.normal, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'Arrow4', properties: { force: 24, hitType: HitType.normal, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'Arrow5', properties: { force: 24, hitType: HitType.normal, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'WeakCurse', properties: { force: 5, hitType: HitType.magic, moveSpeed: 0, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'MiscastCurse', properties: { force: 1, hitType: HitType.magic, moveSpeed: 0, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            //魔法
            { name: 'Magic1', properties: { hitType: HitType.magic, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'Magic2', properties: { hitType: HitType.magic, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'Magic3', properties: { hitType: HitType.magic, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'Magic4', properties: { hitType: HitType.magic, moveSpeed: 10, idleTicks: 0, fightingTicks: 10, dyingTicks: 0 } },
            { name: 'BlackWater', properties: { hitType: HitType.magic, moveSpeed: 0, force: 5, idleTicks: 0, dyingTicks: 0 } },
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