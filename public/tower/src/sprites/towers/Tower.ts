class Tower extends Object {
    private _enemy: Enemy;
    
    /**射程范围最大半径*/
    private _maxRadius: number = 140;

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
    
    protected _idle() {
        this._do(ObjectState.building);
    }
    
    protected _building() {
        if (this._ticks > 100) {
            this._do(ObjectState.fighting);
        }
    }
    
    protected _fighting() {
        if (!this._enemy || this._enemy.dead() || !this._enemy.intersect(this.x, this.y, this._maxRadius)) {
            this._enemy = application.map.searchEnemy(this.x, this.y, this._maxRadius);
        }
        
        if (this._enemy) {
            if (this._ticks - this._lastFireTicks >= this._speed) {
                this._fire(this._enemy);
                
                this._lastFireTicks = this._ticks;
            }
        }
    }
    
    protected _fire(enemy: Enemy) {
        
    }
}
