class SoliderTower extends Tower {
    protected _guardX: number;
    protected _guardY: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
    }
    
    private _addSolider(claz:string, idleTicks:number) {
        let solider = <Soldier>application.pool.get(claz, {"guardX": this._guardX, "guardY": this._guardY, idleTicks: idleTicks});
        solider.setCreator(this);
        application.battle.addSoldier(solider);
    }

    public create(child:Entity) {
        this._addSolider(this.getClassName(), 100);
    }
    
    public guard() {
        for(let i = 0; i < 3; i++) {
            this._addSolider("Soldier", 0);
        }
    }
}
