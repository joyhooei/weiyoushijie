class SoliderTower extends Tower {
    protected _guardX: number;
    
    protected _guardY: number;
    
    protected _totalSoliders: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
        
        this._totalSoliders = 0;
    }
    
    private addSolider() {
        let solider = <Solider>application.pool.get("Solider", {"guardX": this._guardX, "guardY": this._guardY});
        solider.setParent(this);

        application.map.addSolider(this.x, this.y, solider);
        
        this._totalSoliders ++;
    }
    
    public childDead(child:Entity) {
        this._totalSoliders --;
    }
    
    protected _stateChanged(oldState: EntityState, newState: EntityState) {
        if (newState == EntityState.guarding) {
            this.addSolider();
            this.addSolider();
            this.addSolider();
        }
    }
    
    protected _guarding() {
        if (this._ticks % this._hitSpeed == 0 && this._totalSoliders.length < 3) {
            this.addSolider();
        }
    }
}
