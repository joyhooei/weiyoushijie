class ArrowTower extends Tower {
    protected _solders: Solider[];
    
    protected _guardRadius: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._guardRadius = this._get(properties, "guardRadius", 10);
    }
    
    protected _stateChanged(oldState: EntityState, newState: EntityState) {
        super._stateChanged(oldState, newState);
        
        if (newState == EntityState.guarding) {
            let solider = this._createSolider();
            solider.x = 30;
            solider.y = 30;
            this.addChild(solider);
            this._solders.push(solider);
            
            solider = this._createSolider();
            solider.x = 100;
            solider.y = 100;
            this.addChild(solider);
            this._solders.push(solider);            
        }
    }
    
    protected _createSolider():ArrowSolider {
        return <ArrowSolider>application.pool.get(
                "ArrowSolider", 
                {"guardX": this.parent.x, "guardY": this.parent.y, "guardRadius", this._guardRadius})
    }
    
    public update() {
        super.update();
        
        for(let i = 0; i < this._solders.length; i++) {
            this._solders[i].update();
        }
    }
    
    protected _paint() {
        super._paint();
        
        for(let i = 0; i < this._solders.length; i++) {
            this._solders[i]._paint();
        }
    }        
        
}
