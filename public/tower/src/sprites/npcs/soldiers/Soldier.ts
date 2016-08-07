class Soldier extends NPC {
    private _guardX: number;
    private _gradeY: number;
    private _guardRadius: number;

    private _enemy: Enemy;
    
    public constructor() {
        super();
        
        this._enemy = null;

        this._guardX = 0;
        this._gradeY = 0;
        this._guardRadius = 10;
    }
    
    protected _stateChanged(oldState:EntityState, newState:EntityState) {
        if (newState == EntityState.guarding) {
            this._turn(this._direction8(this._guardX, this._gradeY));
        }
        
        super._stateChanged(oldState, newState);
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            if (this._enemy) {
                this._do(EntityState.fighting);
            } else {
                this._do(EntityState.guarding);
            }
        }
    }
    
    protected _guarding() {
        this._findEnemy();
    }
    
    private _moveTo(x:number, y:number) {
        this.setPaths([[this.x, this.y], [x, y]]);
        this._do(EntityState.moving);
    }
    
    protected _fighting() {
        if (this._state % this._hitSpeed == 0) {
            this._enemy.hitBy(this._damage);
            if (this._enemy.dying() && !this._findEnemy()) {
                this._moveTo(this._guardX, this._gradeY);
            }
        }
    }
    
    private _findEnemy(): Enemy {
        this._enemy = application.battle.findEnemy(this.x, this.y, this._guardRadius);
        if (this._enemy) {
            this._moveTo(this._enemy.x,this._enemy.y);
            this._enemy.addSolider(this);
        }
        
        return this._enemy;
    }
}
