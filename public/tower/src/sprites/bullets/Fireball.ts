class Fireball extends Bullet {
    protected _hitRadius: number;
    
    public constructor() {
        super();
        
        this.addAllClips("fireball_moving", "moving")
            .addAllClips("fireball_fighting", "fighting");        
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0]);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].shootBy(this);
        }
    }
}
