class Soldier extends NPC implements SelectableEntity {
    protected _guardX: number;
    protected _guardY: number;
    
    protected _guardRadius: number;
    
    protected _guardAltitudes: number[];

    protected _enemy: Enemy;
    
    protected _creator: SoldierCreator;
    
    protected _range: GuardRange;
    
    protected _liveTicks: number;

    public constructor() {
        super();
        
        this.touchEnabled = true;
    }
    
    public select(again:boolean): boolean {
        if (again) {
            this.deselect();

            return false;
        } else {
            this._range = <GuardRange>application.pool.get("GuardRange", {guardRadius: this._guardRadius});
            
            this._range.x = this.getCenterX() - this._guardRadius;
            this._range.y = this.getCenterY() - this._guardRadius;
            
            this._range.width  = this._guardRadius << 1;
            this._range.height = this._guardRadius << 1;
            
            application.battle.addEntity(this._range);

            return true;            
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
        this._guardRadius   = this._get(properties, 'guardRadius', 20);
        this._guardAltitudes = this._get(properties, 'guardAltitude', [-1, 0]);

        this._liveTicks = this._get(properties, 'liveTicks', 3600 * application.frameRate);

        this._idleTicks = 1;
        
        this._enemy = null;
        this._range = null;
        this._creator = null;
    }
    
    public update():boolean {
        this._liveTicks --;
        if (this._liveTicks <= 0) {
            this.erase();
        }
        
        return super.update();
    }

    public setCreator(creator: SoldierCreator) {
        this._creator = creator;
    }
    
    protected _idle() {
        this._ticks ++;
        if (this._ticks >= this._idleTicks) {
            this.moveTo(this._guardX, this._guardY);

        	if (this._hp) {
        		this._hp.move();
        	}
        }
    }
    
    public erase() {
        super.erase();
        
        if (this._enemy) {
            this._enemy.rmvSoldier(this);
            this._enemy = null;
        }

        if (this._range) {
            this._range.erase();
            this._range = null;
        }
        
        if (this._creator) {
            this._creator.createSoldier(this);
        }
    }
    
    public relive(idleTicks = 0):Soldier {
        if (idleTicks == 0) {
            idleTicks = this._idleTicks;
        }
        let soldier = <Soldier>application.pool.get(this.getClassName(), {guardX: this._guardX, guardY: this._guardY, idleTicks: idleTicks});
        soldier.x = this.x;
        soldier.y = this.y;
        soldier.width = this.width;
        soldier.height = this.height;
        soldier.setCreator(this._creator);
        return soldier;
    }
    
    public moveTo(x:number, y:number) {
        let x1 = x - (this.width >> 1);
        let y1 = y - this.height;
        this._turn(this._direction4(x, y));
        if (this._computeSteps(this.x, this.y, x1, y1)) {
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
            this._range.y = this.getCenterY() - this._guardRadius;
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
        
        this._moveToEnemy(enemy);
        
        this._enemy = enemy;
        this._enemy.addSoldier(this);
    }
    
    protected _moveToEnemy(enemy:Enemy) {
        let x = enemy.getCenterX() + enemy.width + 5;
        let y = enemy.getBottomY();
        if (enemy.totalSoldiers() == 1) {
            y -= enemy.height;
        } else if (enemy.totalSoldiers() == 2) {
            y += enemy.height;
        }

        this.moveTo(x, y);
    }

    protected _hitOpponents() {
        if (!this._enemy || this._enemy.hitBy(this)) {
            let enemy = this._findEnemy();
            if (enemy) {
                this._fightWith(enemy);
            } else {
                this._enemy = null;
                this.moveTo(this._guardX, this._guardY);
            }
        } else if (this._enemy.totalSoldiers() > 1) {
            let enemy = this._findEnemy();
            if (enemy && enemy.totalSoldiers() == 0) {
                this._enemy.rmvSoldier(this);
                this._fightWith(enemy);
            }
        }
    }

    private _findEnemy(): Enemy {
        let enemy = application.battle.findSuitableEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, this._guardAltitudes);
        if (!enemy || enemy.totalSoldiers() >= 3) {
            return null;
        } else {
            return enemy;
        }
    }
}
