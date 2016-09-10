class Fireball extends Bullet {
    protected _hitRadius: number;
    
    public constructor() {
        super();
        
        this._displays.addClip("fireball_moving", "moving").addClip("fireball_dying", "dying");        
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 20);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0]);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].shootBy(this);
        }
    }
}
