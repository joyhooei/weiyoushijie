class Soldier extends NPC {
    private _guardX: number;
    private _gradeY: number;
    
    private _guardRadius: number;
    
    private _guardAltitude: numbers;

    private _enemy: Enemy;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._enemy = null;

        this._guardX = this._get(properties, 'guardX', 0);
        this._gradeY = this._get(properties, 'guardY', 0);
        
        this._guardRadius = this._get(properties, 'guardRadius', 10);
        
        this._guardAltitude = this._get(properties, 'guardAltitude', [-1, 0]);
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

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            this._enemy.hitBy(this._damage);
            if ((this._enemy.dying() || this._enemy.dead()) && !this._findEnemy()) {
                this.moveTo(this._guardX, this._gradeY);
            }
        }
    }
    
    private _findEnemy(): Enemy {
        this._enemy = application.battle.findEnemy(this.x, this.y, this._guardRadius, this._guardAltitude);
        if (this._enemy) {
            this.moveTo(this._enemy.x,this._enemy.y);
            this._enemy.addSolider(this);
        }
        
        return this._enemy;
    }
}
