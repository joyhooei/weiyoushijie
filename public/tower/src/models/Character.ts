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
            //heros
            {name: 'Sunwukong', properties:{hp:245, forceHigh:10, forceLow:6, armor: 15, cureSpeed:1, moveSpeed:1, idleTicks: 20 * application.frameRate, guardRadius: 50, guardAltitude:[-1, 0]}},

            //soldiers
            {name: 'Reinforce', properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, liveTicks: 20 * application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Warrior',   properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, liveTicks: 8 * application.frameRate, guardRadius: 40, guardAltitude:[-1, 0]}},

            //tower soldiers
            {name: 'Soldier1',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Soldier2',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Soldier3',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Soldier4',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'Soldier5',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'BombSoldier1',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'BombSoldier2',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'BombSoldier3',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'BombSoldier4',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'BombSoldier5',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0]}},
            {name: 'ArrowSoldier1',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0, 1]}},
            {name: 'ArrowSoldier2',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0, 1]}},
            {name: 'ArrowSoldier3',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0, 1]}},
            {name: 'ArrowSoldier4',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0, 1]}},
            {name: 'ArrowSoldier5',  properties:{hp:100, force:6, armor: 0, cureSpeed:1, moveSpeed:1, guardRadius: 40, guardAltitude:[-1, 0, 1]}},            

            //enemies
            {name: 'Hogs',  properties:{bonus:10, hp:100, force:6, cureSpeed:0, moveSpeed:1, idleTick:0, dyingTicks:10}},
            {name: 'Rhino', properties:{bonus:10, hp:100, force:6, cureSpeed:0, moveSpeed:1, idleTick:0, dyingTicks:10}},
            {name: 'Wolf',  properties:{bonus:10, hp:100, force:6, cureSpeed:0, moveSpeed:1, idleTick:0, dyingTicks:10}},

            //bullets
            {name: 'Fireball', properties:{force:6, hitRadius:10, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Bomb1',     properties:{force:6, hitRadius:10, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Bomb2',     properties:{force:6, hitRadius:10, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Bomb3',     properties:{force:6, hitRadius:10, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Bomb4',     properties:{force:6, hitRadius:10, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Bomb5',     properties:{force:6, hitRadius:10, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Arrow1',    properties:{force:6, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Arrow2',    properties:{force:6, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Arrow3',    properties:{force:6, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Arrow4',    properties:{force:6, moveSpeed:5, idleTick:0, dyingTicks:10}},
            {name: 'Arrow5',    properties:{force:6, moveSpeed:5, idleTick:0, dyingTicks:10}},
        ]; 

        for(let i = 0; i < config.length; i++) {
            let d = config[i];
            characters[d.name] = new Character(d.properties);
        }
        
        return characters;
    }
}
