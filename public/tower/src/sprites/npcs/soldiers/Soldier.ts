class Soldier extends NPC {
    protected _guardX: number;
    protected _guardY: number;
    
    protected _guardRadius: number;
    
    protected _guardAltitudes: number[];

    protected _enemy: Enemy;
    
    protected _creator: SoldierCreator;
    
    protected _range: Range;

    public constructor() {
        super();
        
        application.battle.enableSelect(this);
    }
    
    public select(again:boolean) {
        if (!again) {
            this._range = application.pool.get("Range", {guardRadius: this._guardRadius});
            
            this._range.x = this.getCenterX() - this._guardRadius;
            this._range.y = this.getCenterY() - this._guardRadius >> 1;
            
            this._range.width  = this._guardRadius << 1;
            this._range.height = this._guardRadius;
            
            application.battle.addRange(this._range);
        }
    }
    
    public deselect() {
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._guardX        = this._get(properties, 'guardX', 0);
        this._guardY        = this._get(properties, 'guardY', 0);
        this._guardRadius   = this._get(properties, 'guardRadius', 10);
        this._guardAltitudes = this._get(properties, 'guardAltitude', [-1, 0]);
        
        this._enemy = null;
        this._range = null;
        this._creator = null;
    }
    
    public setCreator(creator: SoldierCreator) {
        this._creator = creator;
    }
    
    public erase() {
        super.erase();
        
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
        
        if (this._creator) {
            this._creator.create(this);
        }
    }
    
    public relive(idleTicks:number):Soldier {
        let soldier = <Soldier>applicaton.pool.get(this.getClassName(), {guardX: this._guardX, guardY: this._guardY, idleTicks: idleTicks});
        soldier.x = this.x;
        soldier.y = this.y;
        soldier.width = this.width;
        soldier.height = this.height;
        soldier.setCreator(this._creator);
        return soldier;
    }
    
    public moveTo(x:number, y:number) {
        if (this._computeSteps(x, y)) {
            this.move();
        } else {
            this._arrive();
        }
    }
    
    private _arrive() {
        if (this._enemy) {
            this._face(this._enemy);
            this.fight();
        } else {
            this.guard();
        }        
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            this._arrive();
        }
        
        if (this._range) {
            this._range.x = this.getCenterX() - this._guardRadius;
            this._range.y = this.getCenterY() - this._guardRadius >> 1;
        }
        
        if (this._hp) {
            this._hp.cure();
        }
    }
    
    protected _guarding() {
        let enemy = this._findEnemy();
        if (enemy) {
            this._fightWith(enemy);
        }
        
        if (this._hp) {
            this._hp.cure();
        }
    }
    
    protected _fightWith(enemy:Enemy) {
        if (this._enemy) {
            this._enemy.rmvSoldier(this);
        }
        
        this._enemy = enemy;
        
        let h = this._enemy.height;
        let w = this._enemy.width;
        
        let xDeltas:number[] = [ 0, w, w, w, 0, -w, -w, -w];
        let yDeltas:number[] = [-h,-h, 0, h, h,  h,  0, -h];
        
        let direction = this._direction8(this._enemy.x, this._enemy.y);

        this.moveTo(this._enemy.x - xDeltas[direction], this._enemy.y - xDeltas[direction]);
        this._enemy.addSoldier(this);
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
            } else if (this._enemy.totalSoldiers() > 1) {
                let enemy = this._findEnemy();
                if (enemy && enemy.totalSoldiers() == 0) {
                    this._fightWith(enemy);
                }
            }
        }
    }
    
    private _findEnemy(): Enemy {
        return application.battle.findSuitableEnemy(this._guardX, this._guardY, this._guardRadius, this._guardAltitudes);
    }
}
