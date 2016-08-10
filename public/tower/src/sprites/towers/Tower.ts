class Tower extends Entity {
    private _enemy: Enemy;
    
    /**射程范围最大半径*/
    private _maxRadius: number = 140;

    private _fireSpeed: number;
    
    private _lastFireTicks: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties?:any) {
        super.initialize(properties);
        
        this._enemy = null;
        this._lastFireTicks = 0;
        
        this._fireSpeed = properties.fireSpeed;
        this._maxRadius = properties.maxRadius;
    }
    
    protected _idle() {
        this._do(EntityState.building);
    }
    
    protected _building() {
        if (this._ticks > 100) {
            this._do(EntityState.fighting);
        }
    }
    
    protected _fighting() {
        if (!this._enemy || this._enemy.dead() || !this._enemy.intersect(this.x, this.y, this._maxRadius)) {
            this._enemy = application.battle.findEnemy(this.x, this.y, this._maxRadius);
        }
        
        if (this._enemy) {
            if (this._ticks - this._lastFireTicks >= this._fireSpeed) {
                this._fire(this._enemy);
                
                this._lastFireTicks = this._ticks;
            }
        }
    }
    
    protected _fire(enemy: Enemy) {
        
    }
}
