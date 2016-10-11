class SoldierTower extends Tower implements SoldierCreator {
    protected _guardX: number;
    protected _guardY: number;
    
    protected _soldierClaz: string;
    
    protected _soldiers: Soldier[];
    
    protected _flag: FlagTip;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
        
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
        soldier.relive(10 * application.frameRate);
        this._addSoldier(soldier);

        return soldier;
    }
    
    public guard() {
        super.guard();
        
        let delta = 15;
        this._createSoldier(this._soldierClaz, {force: this._force, guardX: this._guardX + delta, guardY: this._guardY + delta, idleTicks: 0});
        this._createSoldier(this._soldierClaz, {force: this._force, guardX: this._guardX - delta, guardY: this._guardY + delta, idleTicks:  application.frameRate});
        this._createSoldier(this._soldierClaz, {force: this._force, guardX: this._guardX + delta, guardY: this._guardY - delta, idleTicks: 2 * application.frameRate});
    }
    
    public guardAt(x: number, y: number) {
        let deltaX = x - this._guardX;
        let deltaY = y - this._guardY;
        
        for(let i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].guardAt(this._soldiers[i].getGuardX() + deltaX, this._soldiers[i].getGuardY() + deltaY);
        }
        
        this._guardX = x;
        this._guardY = y;
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
        
        s.setCreator(this);
        s.setCenterX(this.getCenterX());
        s.setBottomY(this.getBottomY());
        
        application.battle.addSoldier(s);
    }
}
