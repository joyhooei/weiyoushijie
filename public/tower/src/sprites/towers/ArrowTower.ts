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
        if (newState == EntityState.guarding) {
            this._solders.push(<Solider>application.pool.get("ArrowSolider", {"guardX": this.x, "guardY": this.y, "guardRadius", this._guardRadius}));
            this._solders.push(<Solider>application.pool.get("ArrowSolider", {"guardX": this.x, "guardY": this.y, "guardRadius", this._guardRadius}));
        }
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
