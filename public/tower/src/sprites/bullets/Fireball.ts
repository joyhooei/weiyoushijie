class Fireball extends Bullet {
    protected _hitRadius: number;
    
    public constructor() {
        super();
        
        this.addClip("fireball_moving", "east-moving")
            .addClip("fireball_fighting", "east-fighting");        
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
        
        let skill = Skill.get(this.getClaz(), 0);
        if (skill) {
            if (skill.attrs.level == 1) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow  = Math.round(1.05 * this._forceLow);
            }
            
            if (skill.attrs.level == 4) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow  = Math.round(1.05 * this._forceLow);
            }
            
            if (skill.attrs.level == 6) {
                this._forceHigh = Math.round(1.2 * this._forceHigh);
                this._forceLow  = Math.round(1.2 * this._forceLow);
            }
        }
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0]);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].shootBy(this);
        }
    }
}
