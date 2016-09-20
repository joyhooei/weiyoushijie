class ArrowTower extends Tower {
    protected _soldiers: ArrowSoldier[];
    
    protected _soldierClaz: string;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
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

    protected _addSoldier(className:string, x: number, y: number) {
        let soldier =  <ArrowSoldier>application.pool.get(className, {"guardX": x, "guardY": y, "guardRadius": this._guardRadius});
                
        soldier.setCenterX(x);
        soldier.setBottomY(y);
        
        this._soldiers.push(soldier);
        application.battle.addChild(soldier);
    }
    
    public update() : boolean {       
        for(let i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].update();
        }

        return super.update();
    }
}
