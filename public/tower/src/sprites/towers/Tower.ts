class Tower extends Object {
    private _enemy: Enemy;
    
    /**射程范围最大半径*/
    private _maxRadius: number = 140;
    
    /**射程范围最小半径*/
    private _minRadius: number = 100;
    
    /**将圆沿y轴压扁变为椭圆时候的比例*/
    private _ratioY: number;
    
    private _speed: number;
    
    private _lastFireTicks: number;
    
    public constructor() {
        super();
        
        this._enemy = null;
        
        this._speed = 5;
        this._lastFireTicks = 0;
    }
    
    protected _idle(ticks:number) {
        this._changeState(ObjectState.building, ticks);
    }
    
    protected _building(ticks:number) {
        if (ticks > 100) {
            this._changeState(ObjectState.fighting, ticks);
        }
    }
    
    protected _fighting(ticks:number) {
        if (!this._enemy || this._enemy.dead() || !this._enemy.intersect(this.x, this.y, this._maxRadius)) {
            this._enemy = application.map.searchEnemy(this.x, this.y, this._maxRadius);
        }
        
        if (this._enemy) {
            if (ticks - this._lastFireTicks >= this._speed) {
                this._fire(this._enemy);
                
                this._lastFireTicks = ticks;
            }
        }
    }
    
    protected _fire(enemy: Enemy) {
        
    }
}
