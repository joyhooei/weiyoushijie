class ArrowTower extends Tower {
    protected _soldiers: ArrowSoldier[];
    
    protected _soldierClaz: string;

    public constructor() {
        super();
    }

    public erase() {
        super.erase();
        
        for(let i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].erase();
        }
        this._soldiers = [];
    }

    public guard(){
        super.guard();

        this._addSoldier(this._soldierClaz, this.x + 36, this.y + 15);
        this._addSoldier(this._soldierClaz, this.x + 50, this.y + 15);
    }

    protected _addSoldier(claz:string, x: number, y: number) {
        let soldier =  <ArrowSoldier>application.pool.get(claz, {guardX: x, guardY: y, guardRadius: this._guardRadius});
                
        soldier.setCenterX(x);
        soldier.setBottomY(y);
        
        this._soldiers.push(soldier);
        application.battle.addEntity(soldier);
    }
}
