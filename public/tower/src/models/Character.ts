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
            {name: 'Battle2',   properties:{lives: 20, golds:10000, heroWinned: 'Zhubajie'}},
            {name: 'Battle3',   properties:{lives: 20, golds:1000}},
            {name: 'Battle4',   properties:{lives: 20, golds:1000}},
            {name: 'Battle5',   properties:{lives: 20, golds:1000, heroWinned: 'Shaseng', boss: 'Boss1'}},
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
            
            //英雄
            {name: 'Sunwukong',  properties:{hp:245, forceHigh:10, forceLow:6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed:1, moveSpeed:1, idleTicks: 0, dyingTicks:application.frameRate, guardRadius: 50, guardAltitude:[-1, 0]}},
            {name: 'Zhubajie',   properties:{hp:245, forceHigh:10, forceLow:6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed:1, moveSpeed:1, idleTicks: 0, dyingTicks:application.frameRate, guardRadius: 50, guardAltitude:[-1, 0]}},
            {name: 'Shaseng',    properties:{hp:245, forceHigh:10, forceLow:6, resistance: 5, armor: 15, magicArmor: 15, cureSpeed:1, moveSpeed:1, idleTicks: 0, dyingTicks:application.frameRate, guardRadius: 50, guardAltitude:[-1, 0]}},

            //soldiers
            {name: 'Reinforce', properties:{hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, idleTicks: 0, liveTicks: 20 * application.frameRate, dyingTicks:application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Warrior',   properties:{hp:100, force:6, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, idleTicks: 0, liveTicks: 8 * application.frameRate, dyingTicks:application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Ghost',     properties:{hp:40, forceHigh:6, forceLow:1, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, idleTicks: 0, dyingTicks:application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'WhiteImpermanence',   properties:{hp:80, forceHigh:10, forceLow:2, armor: 20, magicArmor: 0, cureSpeed:1, idleTicks: 0, dyingTicks:application.frameRate, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'BlackImpermanence',   properties:{hp:250, forceHigh:10, forceLow:5, armor: 40, magicArmor: 0, cureSpeed:1, idleTicks: 0, dyingTicks:application.frameRate, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},

            //守护塔士兵
            {name: 'Soldier1',  properties:{hp:50, force:3, armor: 0, magicArmor: 0, cureSpeed:1, moveSpeed:1, guardRadius:50, guardAltitude:[-1, 0], idleTicks: 0, dyingTicks:application.frameRate}},
            {name: 'Soldier2',  properties:{hp:50, force:6, armor: 0, magicArmor: 3, cureSpeed:1, moveSpeed:1, guardRadius:50, guardAltitude:[-1, 0], idleTicks: 0, dyingTicks:application.frameRate}},
            {name: 'Soldier3',  properties:{hp:50, force:9, armor: 0, magicArmor: 6, cureSpeed:1, moveSpeed:1, guardRadius:50, guardAltitude:[-1, 0], idleTicks: 0, dyingTicks:application.frameRate}},
            {name: 'Soldier4',  properties:{hp:50, force:12, armor: 0, magicArmor: 9, cureSpeed:1, moveSpeed:1, guardRadius:50, guardAltitude:[-1, 0], idleTicks: 0, dyingTicks:application.frameRate}},        

            //Boss
            {name: 'Boss1',  properties:{bonus:5, livesTaken: 10, hp:[4000, 6000, 7800], forceHigh:60, forceLow:20, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1}},
            
            //小怪
            {name: 'Enemy1',  properties:{bonus:5, livesTaken: 1, hp:[40, 60, 78], forceHigh:6, forceLow:2, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy2',  properties:{bonus:16, livesTaken: 1, hp:[140, 200, 260], forceHigh:10, forceLow:6, armor: 20, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy3',  properties:{bonus:12, livesTaken: 1, hp:[130, 180, 234], forceHigh:20, forceLow:10, armor: 0, magicArmor: 20, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy4',  properties:{bonus:5, livesTaken: 1, hp:[25, 35, 46], forceHigh:3, forceLow:1, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy5',  properties:{bonus:10, livesTaken: 1, hp:[90, 120, 156], forceHigh:18, forceLow:12, armor: 0, magicArmor: 40, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            
            {name: 'Enemy6',  properties:{bonus:24, livesTaken: 2, hp:[260, 360, 468], forceHigh:28, forceLow:12, armor: 50, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy7',  properties:{bonus:0, livesTaken: 1, hp:[90, 110, 143], forceHigh:28, forceLow:12, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy8',  properties:{bonus:130, livesTaken: 5, hp:[1000, 1400, 2600], forceHigh:69, forceLow:30, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy9',  properties:{bonus:28, livesTaken: 2, hp:[350, 500, 650], forceHigh:500, forceLow:350, armor: 85, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy10',  properties:{bonus:8, livesTaken: 1, hp:[60, 80, 104], forceHigh:0, forceLow:0, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, altitude:1, idleTicks:0, dyingTicks:application.frameRate}},
            
            {name: 'Enemy11',  properties:{bonus:40, livesTaken: 5, hp:[320, 320, 416], forceHigh:0, forceLow:0, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy12',  properties:{bonus:10, livesTaken: 1, hp:[100, 100, 130], forceHigh:8, forceLow:4, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, altitude:-1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy13',  properties:{bonus:100, livesTaken: 1, hp:[700, 1000, 1300], forceHigh:60, forceLow:30, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy14',  properties:{bonus:8, livesTaken: 1, hp:[80, 80, 104], forceHigh:20, forceLow:10, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy15',  properties:{bonus:8, livesTaken: 1, hp:[400, 400, 520], forceHigh:40, forceLow:20, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            
            {name: 'Enemy16',  properties:{bonus:15, livesTaken: 1, hp:[200, 200, 260], forceHigh:16, forceLow:10, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy17',  properties:{bonus:15, livesTaken: 1, hp:[120, 120, 156], forceHigh:17, forceLow:10, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy18',  properties:{bonus:50, livesTaken: 1, hp:[420, 600, 780], forceHigh:22, forceLow:14, armor: 80, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy19',  properties:{bonus:50, livesTaken: 1, hp:[420, 600, 780], forceHigh:23, forceLow:14, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy20',  properties:{bonus:50, livesTaken: 1, hp:[420, 600, 780], forceHigh:24, forceLow:14, armor: 0, magicArmor: 80, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            
            {name: 'Enemy21',  properties:{bonus:15, livesTaken: 1, hp:[560, 800, 1040], forceHigh:30, forceLow:15, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy22',  properties:{bonus:0, livesTaken: 1, hp:[400, 400, 520], forceHigh:50, forceLow:30, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy23',  properties:{bonus:160, livesTaken: 5, hp:[1960, 2800, 3640], forceHigh:80, forceLow:40, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy24',  properties:{bonus:25, livesTaken: 1, hp:[160, 250, 325], forceHigh:80, forceLow:40, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy25',  properties:{bonus:5, livesTaken: 1, hp:[120, 120, 156], forceHigh:20, forceLow:10, armor: 0, magicArmor: 60, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            
            {name: 'Enemy26',  properties:{bonus:10, livesTaken: 1, hp:[400, 400, 520], forceHigh:60, forceLow:30, armor: 0, magicArmor: 60, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy27',  properties:{bonus:10, livesTaken: 1, hp:[70, 100, 130], forceHigh:0, forceLow:0, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, altitude:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy28',  properties:{bonus:100, livesTaken: 1, hp:[300, 500, 650], forceHigh:0, forceLow:0, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, altitude:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy29',  properties:{bonus:12, livesTaken: 1, hp:[210, 300, 390], forceHigh:22, forceLow:8, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy30',  properties:{bonus:50, livesTaken: 1, hp:[560, 600, 780], forceHigh:34, forceLow:16, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            
            {name: 'Enemy31',  properties:{bonus:40, livesTaken: 1, hp:[420, 600, 780], forceHigh:22, forceLow:18, armor: 0, magicArmor: 80, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy32',  properties:{bonus:25, livesTaken: 1, hp:[280, 280, 336], forceHigh:42, forceLow:28, armor: 0, magicArmor: 40, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy33',  properties:{bonus:20, livesTaken: 1, hp:[200, 200, 240], forceHigh:22, forceLow:18, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy34',  properties:{hitType:HitType.damage,bonus:200, livesTaken: 5, hp:[3080, 4400, 5280], forceHigh:120, forceLow:60, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            {name: 'Enemy35',  properties:{bonus:100, livesTaken: 1, hp:[700, 1000, 1200], forceHigh:66, forceLow:34, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},
            
            {name: 'Enemy36',  properties:{bonus:10, livesTaken: 1, hp:[40, 60, 78], forceHigh:6, forceLow:2, armor: 0, magicArmor: 0, cureSpeed:0, moveSpeed:1, idleTicks:0, dyingTicks:application.frameRate}},

            //防护塔
            {name: 'SoldierTower1',  properties:{force: 3, guardRadius: 160, price: 100, upgradePrice: 100}},
            {name: 'SoldierTower2',  properties:{force: 6,guardRadius: 160, price: 200, upgradePrice: 100}},
            {name: 'SoldierTower3',  properties:{force: 9,guardRadius: 160, price: 300, upgradePrice: 100}},
            {name: 'SoldierTower4',  properties:{force: 12,guardRadius: 160, price: 530}},
            
            //炮塔
            {name: 'BombTower1',  properties:{force: 20, guardRadius: 160, shootSpeed: Math.round(1.5* application.frameRate), price: 120, upgradePrice: 150}},
            {name: 'BombTower2',  properties:{force: 30, guardRadius: 180, shootSpeed: Math.round(1.5* application.frameRate), price: 270, upgradePrice: 150}},
            {name: 'BombTower3',  properties:{force: 40, guardRadius: 200, shootSpeed: Math.round(1.5* application.frameRate), price: 320, upgradePrice: 230}},
            {name: 'BombTower4',  properties:{force: 30, guardRadius: 220, shootSpeed: Math.round(1.5* application.frameRate), price: 550}},
            
            //箭塔
            {name: 'ArrowTower1',  properties:{force: 8, guardRadius: 160, price: 70, upgradePrice: 100}},
            {name: 'ArrowTower2',  properties:{force: 12, guardRadius: 200, price: 170, upgradePrice: 150}},
            {name: 'ArrowTower3',  properties:{force: 16, guardRadius: 240, price: 320, upgradePrice: 230}},
            {name: 'ArrowTower4',  properties:{force: 24, guardRadius: 200, price: 550}},
            {name: 'ArrowTower5',  properties:{force: 24, guardRadius: 200, price: 550}},            
            
            //魔法塔
            {name: 'MagicTower1',  properties:{forceHigh:17, forceLow:9,  shootSpeed: Math.round(1.5* application.frameRate), guardRadius: 160, price: 100, upgradePrice: 160}},
            {name: 'MagicTower2',  properties:{forceHigh:43, forceLow:23, shootSpeed: Math.round(1.5* application.frameRate), guardRadius: 180, price: 160, upgradePrice: 240}},
            {name: 'MagicTower3',  properties:{forceHigh:74, forceLow:40, shootSpeed: Math.round(1.5* application.frameRate), guardRadius: 250, price: 240, upgradePrice: 300}},
            {name: 'MagicTower4',  properties:{forceHigh:70, forceLow:20, shootSpeed: Math.round(0.8* application.frameRate), guardRadius: 220, price: 300}},         

            //道具
            {name: 'Fireball',  properties:{force:500, hitType:HitType.normal, hitRadius:50, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Freeze',    properties:{force:5,  hitType:HitType.normal, hitRadius:800, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0, curseTicks: 3*application.frameRate}},
            {name: 'Thunder',   properties:{force:500, hitType:HitType.damage, hitRadius:50, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            
            //炮弹
            {name: 'Bomb1',     properties:{force:20, hitType:HitType.normal, hitRadius:50, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Bomb2',     properties:{force:30, hitType:HitType.normal, hitRadius:50, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Bomb3',     properties:{force:40, hitType:HitType.normal, hitRadius:50, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:3 * application.frameRate}},
            {name: 'Bomb4',     properties:{force:30, hitType:HitType.normal, hitRadius:50, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'ScorchedEarth',    properties:{hitType:HitType.normal, moveSpeed:10, force:20, fightingTicks: 0, idleTicks:0, dyingTicks:0}},        
            {name: 'ScorchedEarthBomblet',    properties:{hitType:HitType.normal, moveSpeed:10, force:20, fightingTicks: 0, idleTicks:0, dyingTicks:0}},        
            {name: 'Spike',    properties:{hitType:HitType.normal, moveSpeed:10, force:20, fightingTicks: 10, idleTicks:0, dyingTicks:0}},        
            
            //弓箭
            {name: 'Arrow1',    properties:{force:8,  hitType:HitType.normal,moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Arrow4',    properties:{force:24, hitType:HitType.normal,moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Arrow5',    properties:{force:24, hitType:HitType.normal,moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Arrow6',    properties:{force:24, hitType:HitType.normal,moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'WeakCurse',    properties:{force:5, hitType:HitType.magic,moveSpeed:0, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'MiscastCurse',    properties:{force:1, hitType:HitType.magic,moveSpeed:0, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            
            //魔法
            {name: 'Magic1',    properties:{hitType:HitType.magic, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Magic2',    properties:{hitType:HitType.magic, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Magic3',    properties:{hitType:HitType.magic, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'Magic4',    properties:{hitType:HitType.magic, moveSpeed:10, idleTicks:0, fightingTicks: 10, dyingTicks:0}},
            {name: 'BlackWater',    properties:{hitType:HitType.magic, moveSpeed:0, force:5, idleTicks:0, dyingTicks:0}},        
        ]; 

        for(let i = 0; i < config.length; i++) {
            let d = config[i];
            characters[d.name] = new Character(d.properties);
        }
        
        return characters;
    }
}
