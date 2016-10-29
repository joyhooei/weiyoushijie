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
    
    public getGuardX(): number {
        return this._guardX;
    }
     
    public getGuardY(): number {
        return this._guardY;
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
            this.moveToGuard();

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
    
    public relive(idleTicks: number):Soldier {
        return <Soldier>application.pool.get(this.getClaz(), {guardX: this._guardX, guardY: this._guardY, idleTicks: idleTicks});
    }
    
    public guardAt(x:number, y:number) {
        this._guardX = x;
        this._guardY = y;
        
        //还没有敌人，直接走到新的守护地址
        if (this._enemy == null) {
            this.moveToGuard();
        }
    }
    
    //x和y是脚站立的位置
    public moveTo(x:number, y:number) {
        let x1 = x - (this.width >> 1);
        let y1 = y - this.height;
        this._turn(this._directionAt(x, y));
        if (this._computeSteps(this.x, this.y, x1, y1)) {
            this.move();
        } else {
            this._arrive();
        }
    }
    
    //移动到守护地点
    public moveToGuard() {
        this._enemy = null;
        
        this.moveTo(this._guardX, this._guardY);
    }
    
    private _arrive() {
        if (this._enemy) {
            if (this._enemy.active()) {
                this._face(this._enemy);
                this.fight();
            } else {
                this.moveToGuard();
            }
        } else {
            this.guard();
        }
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            this._arrive();
        } else {
            if (this._enemy && !this._enemy.active()) {
                this.moveToGuard();
            }
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
        
        this._enemy = enemy;
        
        if (this._enemy) {
            let hitPos = this._enemy.addSoldier(this);

            let margin = 3;

            if (hitPos < 3) {
                //左边
                var x = enemy.x - (this.width >> 1) - margin;
            } else {
                var x = enemy.x + enemy.width + (this.width >> 1) + margin;
            }

            let direction:number = hitPos % 3;
            var y = enemy.getCenterY() + (this.height >> 1);
            if (direction == 1) {
                //上边
                y -= (this.height + margin);
            } else if (direction == 2) {
                //下边
                y += (this.height + margin);
            }

            this.moveTo(x, y);
        } else {
            this.moveToGuard();
        }
    }
    
    protected _hitOpponents() {
        if (!this._enemy || !this._enemy.active() || this._enemy.hitBy(this)) {
            this._fightWith(this._findEnemy());
        } else {
            if (this._enemy.totalSoldiers() > 1) {
                // find new enemy without soldiers
                let enemy = this._findEnemy();
                if (enemy && enemy.totalSoldiers() == 0) {
                    this._fightWith(enemy);
                }
            }
        }
    }

    private _findEnemy(): Enemy {
        let enemy = application.battle.findSuitableEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, this._guardAltitudes);
        if (!enemy || enemy.totalSoldiers() >= 6) {
            return null;
        } else {
            return enemy;
        }
    }
}
