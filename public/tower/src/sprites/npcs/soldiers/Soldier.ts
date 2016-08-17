class Soldier extends NPC {
    protected _guardX: number;
    protected _guardY: number;
    
    protected _guardRadius: number;
    
    protected _guardAltitudes: number[];

    protected _enemy: Enemy;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._enemy = null;

        this._guardX        = this._get(properties, 'guardX', 0);
        this._guardY        = this._get(properties, 'guardY', 0);
        this._guardRadius   = this._get(properties, 'guardRadius', 10);
        this._guardAltitudes = this._get(properties, 'guardAltitude', [-1, 0]);
    }
    
    public moveTo(x:number, y:number) {
        this._computeSteps(x, y);

        this.move();
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            if (this._enemy) {
                this.fight();
            } else {
                this.guard();
            }
        }
    }
    
    protected _guarding() {
        let enemy = this._findEnemy();
        if (enemy) {
            this._fightWith(enemy);
        }
    }
    
    protected _fightWith(enemy:Enemy) {
        if (this._enemy) {
            this._enemy.rmvSolider(this);
        }
        
        this._enemy = enemy;
        
        this.moveTo(this._enemy.x, this._enemy.y);
        this._enemy.addSolider(this);
    }

    protected _fighting() {
        if (this._ticks % this._hitSpeed == 0) {
            this._enemy.fight();
            
            if (this._enemy.hitBy(this._damage)) {
                let enemy = this._findEnemy();
                if (enemy) {
                    this._fightWith(enemy);
                } else {
                    this.moveTo(this._guardX, this._guardY);
                }
            } else if (this._enemy.totalSoliders() > 1) {
                let enemy = this._findEnemy();
                if (enemy && enemy.totalSoliders() == 0) {
                    this._fightWith(enemy);
                }
            }
        }
    }
    
    private _findEnemy(): Enemy {
        return application.battle.findSuitableEnemy(this._guardX, this._guardY, this._guardRadius, this._guardAltitudes);
    }
}
