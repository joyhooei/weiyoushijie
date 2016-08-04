class Soldier extends NPC {
    private _guardX: number;
    private _gradeY: number;
    
    private _guardRadius: number;

    private _enemy: Enemy;
    
    public constructor() {
        super();
        
        this._enemy = null;
    }
    
    protected _moving(ticks: number) {
        if (this._move()) {
            if (this._enemy) {
                this._changeState(ObjectState.fighting, ticks);
            } else {
                this._changeState(ObjectState.guarding, ticks);
            }            
        }
    }
    
    protected _guarding(ticks: number) {
        this._findEnemy();
    }
    
    protected _fighting(ticks: number) {
        if (ticks % this._hitSpeed == 0) {
            this._enemy.hitBy(this._damage);
            if (this._enemy.dead()) {
                if (!this._findEnemy()) {
                    this._moveTo([[this._guardX, this._gradeY]]);
                }
            }
        }
    }
    
    private _findEnemy() {
        this._enemy = application.map.findEnemy(this.x, this.y, this._guardRadius));
        if (this._enemy) {
            this._moveTo([[this._enemy.x, this._emeny.y]]);
            
            this._enemy._changeState(ObjectState.guarding, ticks);
        }
        
        return this._enemy;
    }
}
