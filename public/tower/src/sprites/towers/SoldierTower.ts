class SoldierTower extends Tower implements SoldierCreator {
    protected _soldierClaz: string;
    
    protected _soldiers: Soldier[];
    
    protected _flag: FlagTip;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._soldiers = [];
    }
    
    public getGuardX(): number {
        return this._guardX;
    }
     
    public getGuardY(): number {
        return this._guardY;
    }
    
    public showFlag() {
        this._range = <GuardRange>application.pool.get("GuardRange", {guardRadius: this._guardRadius});
        this._range.x = this.getCenterX() - this._guardRadius;
        this._range.y = this.getCenterY() - this._guardRadius;
        this._range.width  = this._guardRadius << 1;
        this._range.height = this._guardRadius << 1;
        application.battle.addEntity(this._range);
        
        this._flag = <FlagTip>application.pool.get("FlagTip");
        this._flag.setCenterX(this._guardX);
        this._flag.setCenterY(this._guardY);
        application.battle.addEntity(this._flag);
    }

    public deselect() {
        super.deselect();
        
        if (this._flag) {
            this._flag.erase();
            this._flag = null;
        }
    }
    
    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(application.frameRate << 2);
        this._addSoldier(s);

        return s;
    }
    
    public guard() {
        super.guard();
        
        let delta = 15;
        this._createSoldier(this._soldierClaz, {forceHigh: this._forceHigh, forceLow: this._forceLow, guardX: this._guardX + delta, guardY: this._guardY + delta, idleTicks: 0});
        this._createSoldier(this._soldierClaz, {forceHigh: this._forceHigh, forceLow: this._forceLow, guardX: this._guardX - delta, guardY: this._guardY + delta, idleTicks:  application.frameRate});
        this._createSoldier(this._soldierClaz, {forceHigh: this._forceHigh, forceLow: this._forceLow, guardX: this._guardX + delta, guardY: this._guardY - delta, idleTicks: 2 * application.frameRate});
    }
    
    public guardAt(x: number, y: number):boolean {
        if (this.within(x, y, this._guardRadius)) {
            let deltaX = x - this._guardX;
            let deltaY = y - this._guardY;

            for(let i = 0; i < this._soldiers.length; i++) {
                this._soldiers[i].guardAt(this._soldiers[i].getGuardX() + deltaX, this._soldiers[i].getGuardY() + deltaY);
            }

            this._guardX = x;
            this._guardY = y;

            return true;
        } else {
            return false;
        }
    }
    
    public erase() {
        for(let i = 0;i < this._soldiers.length;i++) {
            this._soldiers[i].setCreator(null);
            this._soldiers[i].erase();
        }
        this._soldiers = [];
        
        super.erase();
    }

    private _createSoldier(claz:string, options:any) {
        this._addSoldier(<Soldier>application.pool.get(claz, options));
    }
    
    private _addSoldier(s: Soldier) {
        let found = false;
        for(let i = 0;i < this._soldiers.length;i++) {
            if (this._soldiers[i] == s) {
                found = true;
            }
        }
        if (!found) {
            this._soldiers.push(s);
        }
        
        s.setCenterX(this.getMuzzleX());
        s.setCenterY(this.getMuzzleY());
        
        s.setCreator(this);

        application.battle.addSoldier(s);
    }
    
    public getMuzzleX(): number {
        let direction = this._direction4(this._guardX, this._guardY);
        switch(direction){
            case EntityDirection.east:
                return this.x + this.width;

            case EntityDirection.west:
                return this.x;
                
            case EntityDirection.north:
            case EntityDirection.south:
                return this.x + (this.width >> 1);
        }
    }

    public getMuzzleY(): number {
        let direction = this._direction4(this._guardX, this._guardY);
        switch(direction){
            case EntityDirection.east:
            case EntityDirection.west:
                return this.y + (this.height >> 1);
                
            case EntityDirection.north:
               return this.y;
                
            case EntityDirection.south:
                return this.y + this.height;
        }
    }
}
