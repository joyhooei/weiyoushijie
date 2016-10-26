class Character {
    private _properties: any[];

    constructor(properties: any) {
        this._properties = properties;
    }

    public getProperties(): any {
        return this._properties;
    }

    static createAll(): Character[] {
        let characters = new Array<Character>();
        
        let config = [
            //battle
            {name: 'Battle1',   properties:{lives: 20, golds:1000, heroWinned: 'Sunwukong'}},
            {name: 'Battle2',   properties:{lives: 20, golds:1000, heroWinned: 'Zhubajie'}},
            {name: 'Battle3',   properties:{lives: 20, golds:1000}},
            {name: 'Battle4',   properties:{lives: 20, golds:1000}},
            {name: 'Battle5',   properties:{lives: 20, golds:1000, heroWinned: 'Shaseng'}},
            {name: 'Battle6',   properties:{lives: 20, golds:1000}},
            {name: 'Battle7',   properties:{lives: 20, golds:1000}},
            {name: 'Battle8',   properties:{lives: 20, golds:1000}},
            {name: 'Battle9',   properties:{lives: 20, golds:1000}},
            {name: 'Battle10',  properties:{lives: 20, golds:1000}},
            {name: 'Battle11',  properties:{lives: 20, golds:1000}},
            {name: 'Battle12',  properties:{lives: 20, golds:1000}},
            {name: 'Battle13',  properties:{lives: 20, golds:1000}},
            {name: 'Battle14',  properties:{lives: 20, golds:1000}},
            {name: 'Battle15',  properties:{lives: 20, golds:1000}},
            
            //heros
            {name: 'Sunwukong',  properties:{hp:245, forceHigh:10, forceLow:6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed:1, moveSpeed:1, idleTicks: 0, guardRadius: 50, guardAltitude:[-1, 0]}},
            {name: 'Zhubajie',   properties:{hp:245, forceHigh:10, forceLow:6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed:1, moveSpeed:1, idleTicks: 0, guardRadius: 50, guardAltitude:[-1, 0]}},
            {name: 'Shaseng',    properties:{hp:245, forceHigh:10, forceLow:6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed:1, moveSpeed:1, idleTicks: 0, guardRadius: 50, guardAltitude:[-1, 0]}},

            //soldiers
            {name: 'Reinforce', properties:{hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, liveTicks: 20 * application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Warrior',   properties:{hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, liveTicks: 8 * application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Ghost',     properties:{hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, liveTicks: 8 * application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'BlackImpermanence',   properties:{hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, liveTicks: 8 * application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},

            //守护塔士兵
            {name: 'Soldier1',  properties:{hp:50, force:3, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, guardRadius:50, guardAltitude:[-1, 0]}},
            {name: 'Soldier2',  properties:{hp:50, force:6, armor: 0, magicArmor: 3, cureSpeed:1, moveSpeed:1, guardRadius:50, guardAltitude:[-1, 0]}},
            {name: 'Soldier3',  properties:{hp:50, force:9, armor: 0, magicArmor: 6, cureSpeed:1, moveSpeed:1, guardRadius:50, guardAltitude:[-1, 0]}},
            {name: 'Soldier4',  properties:{hp:50, force:12, armor: 0, magicArmor: 9, cureSpeed:1, moveSpeed:1, guardRadius:50, guardAltitude:[-1, 0]}},
            
            //炮塔士兵
            {name: 'BombSoldier1',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0]}},
            {name: 'BombSoldier2',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0]}},
            {name: 'BombSoldier3',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0]}},
            {name: 'BombSoldier4',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0]}},
            {name: 'BombSoldier5',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0]}},
            
            //箭塔士兵
            {name: 'ArrowSoldier1',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0, 1]}},
            {name: 'ArrowSoldier2',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0, 1]}},
            {name: 'ArrowSoldier3',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0, 1]}},
            {name: 'ArrowSoldier4',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0, 1]}},
            {name: 'ArrowSoldier5',  properties:{force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardAltitude:[0, 1]}},            

            //防护塔
            {name: 'SoldierTower1',  properties:{force: 3, guardRadius: 160, price: 100, upgradePrice: 100}},
            {name: 'SoldierTower2',  properties:{force: 6,guardRadius: 160, price: 200, upgradePrice: 100}},
            {name: 'SoldierTower3',  properties:{force: 9,guardRadius: 160, price: 300, upgradePrice: 100}},
            {name: 'SoldierTower4',  properties:{force: 12,guardRadius: 160, price: 530}},
            
            //炮塔
            {name: 'BombTower1',  properties:{force: 20, guardRadius: 160, price: 120, upgradePrice: 150}},
            {name: 'BombTower2',  properties:{force: 30, guardRadius: 180, price: 270, upgradePrice: 150}},
            {name: 'BombTower3',  properties:{force: 40, guardRadius: 200, price: 320, upgradePrice: 230}},
            {name: 'BombTower4',  properties:{force: 30, guardRadius: 220, price: 550}},
            
            //箭塔
            {name: 'ArrowTower1',  properties:{force: 8, guardRadius: 160, price: 70, upgradePrice: 100}},
            {name: 'ArrowTower2',  properties:{force: 12, guardRadius: 200, price: 170, upgradePrice: 150}},
            {name: 'ArrowTower3',  properties:{force: 16, guardRadius: 240, price: 320, upgradePrice: 230}},
            {name: 'ArrowTower4',  properties:{force: 24, guardRadius: 200, price: 550}},
            {name: 'ArrowTower5',  properties:{force: 24, guardRadius: 200, price: 550}},            
            
            //魔法塔
            {name: 'MagicTower1',  properties:{force: 15, guardRadius: 160, price: 100, upgradePrice: 160}},
            {name: 'MagicTower2',  properties:{force: 30, guardRadius: 180, price: 260, upgradePrice: 240}},
            {name: 'MagicTower3',  properties:{force: 60, guardRadius: 250, price: 500, upgradePrice: 230}},
            {name: 'MagicTower4',  properties:{force: 80, guardRadius: 220, price: 730}},         

            //enemies
            {name: 'Hogs',  properties:{bonus:10, hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:10}},
            {name: 'Rhino', properties:{bonus:10, hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:10}},
            {name: 'Wolf',  properties:{bonus:10, hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:10}},

            //bullets
            {name: 'Fireball',  properties:{force:500, hitType:HitType.normal, hitRadius:50, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            {name: 'Freeze',    properties:{force:50,  hitType:HitType.normal, hitRadius:800, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            {name: 'Thunder',   properties:{force:500, hitType:HitType.damage, hitRadius:50, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            
            //炮塔炮弹
            {name: 'Bomb1',     properties:{force:20, hitType:HitType.normal, hitRadius:50, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            {name: 'Bomb2',     properties:{force:30, hitType:HitType.normal, hitRadius:50, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            {name: 'Bomb3',     properties:{force:40, hitType:HitType.normal, hitRadius:50, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:3 * application.frameRate}},
            {name: 'Bomb4',     properties:{force:30, hitType:HitType.normal, hitRadius:50, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            {name: 'Bomb5',     properties:{force:30, hitType:HitType.normal, hitRadius:50, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            
            //弓箭
            {name: 'Arrow1',    properties:{force:8,  hitType:HitType.normal,moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            {name: 'Arrow4',    properties:{force:24, hitType:HitType.normal,moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            {name: 'Arrow5',    properties:{force:24, hitType:HitType.normal,moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
            
            //魔法塔魔法
            {name: 'Magic1',    properties:{hitType:HitType.magic, moveSpeed:5, idleTicks:0, fightTicks: 10, dyingTicks:0}},
        ]; 

        for(let i = 0; i < config.length; i++) {
            let d = config[i];
            characters[d.name] = new Character(d.properties);
        }
        
        return characters;
    }
}
