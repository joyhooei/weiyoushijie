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

        this._addSoldier(this._soldierClaz, 36, 15);
        this._addSoldier(this._soldierClaz, 50, 15);
    }

    protected _addSoldier(className:string, x: number, y: number) {
        let soldier =  <ArrowSoldier>application.pool.get(className, {"guardX": this.getMapX(), "guardY": this.getMapY(), "guardRadius": this._guardRadius});
                
        soldier.x = x;
        soldier.y = y;
        
        this._soldiers.push(soldier);
        this.addChild(soldier);
    }
    
    public update() : boolean {       
        for(let i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].update();
        }

        return super.update();
    }
}
