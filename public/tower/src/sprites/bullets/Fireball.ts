class Fireball extends Bullet {
    protected _hitRadius: number;

    protected _skill: Skill;
    
    public constructor() {
        super();
        
        this.addClip("fireball_moving", "east-moving")
            .addClip("fireball_fighting", "east-fighting");        
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
        
        this._skill = Skill.get(this.getClaz(), 0);
        if (this._skill) {
            if (this._skill.attrs.level == 1) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow  = Math.round(1.05 * this._forceLow);
            }
            
            if (this._skill.attrs.level == 2) {
                this._fightingTicks = 5 * application.frameRate;
            }
            
            if (this._skill.attrs.level == 3) {
                this._forceHigh = Math.round(0.7 * this._forceHigh);
                this._forceLow  = Math.round(0.7 * this._forceLow);
            }
            
            if (this._skill.attrs.level == 4) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow  = Math.round(1.05 * this._forceLow);
            }
            
            if (this._skill.attrs.level == 5) {
                this._forceHigh = Math.round(0.5 * this._forceHigh);
                this._forceLow  = Math.round(0.5 * this._forceLow);
            }
            
            if (this._skill.attrs.level == 6) {
                this._forceHigh = Math.round(1.2 * this._forceHigh);
                this._forceLow  = Math.round(1.2 * this._forceLow);
            }
        }
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0]);
        for (let i = 0; i < enemies.length; i++) {
            if (this._skill) {
                if (this._skill.attrs.level == 2 && this._skill.attrs.level == 3) {
                    enemies[i].burn(20, 5, false, true);  
                } else if (this._skill.attrs.level >= 4) {
                    enemies[i].burn(30, 5, false, true);
                } else {
                    enemies[i].shootBy(this);
                }
            } else {
                enemies[i].shootBy(this);
            }
        }
    }
}
