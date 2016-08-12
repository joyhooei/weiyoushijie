class ArrowTower1 extends Tower {
    protected _soliders: Solider[];

    public constructor() {
        super();
        
        this._soliders.push(this._createSolider(36, 15));
        this._soliders.push(this._createSolider(50, 15));
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this.removeChildren();
    }
    
    protected _stateChanged(oldState: EntityState, newState: EntityState) {
        super._stateChanged(oldState, newState);
        
        if (newState == EntityState.guarding) {
            for(let i = 0; i < this._soliders.length; i++) {
                this.addChild(this._soliders[i]);
            }
        }
    }
    
    protected _createSolider(x: number, y: number):ArrowSolider {
        let solider =  <ArrowSolider>application.pool.get(
                "ArrowSolider", 
                {"guardX": this.getMapX(), "guardY": this.getMapY(), "guardRadius", this._guardRadius});
                
        solider.x = x;
        solider.y = y;   
        
        solider.setParent(this);
        return solider;
    }
    
    public update() {
        super.update();
        
        for(let i = 0; i < this._soliders.length; i++) {
            this._soliders[i].update();
        }
    }
    
    protected _paint() {
        super._paint();
        
        for(let i = 0; i < this._soliders.length; i++) {
            this._soliders[i]._paint();
        }
    }        
        
}
