class ArrowTower extends Tower {
    protected _soliders: Solider[];

    public constructor() {
        super();
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
    
    protected _createSoliders(className:string) {
        this._soliders.push(this._createSolider(className, 36, 15));
        this._soliders.push(this._createSolider(className, 50, 15));
    }
    
    protected _createSolider(className:string, x: number, y: number):ArrowSolider {
        let solider =  <ArrowSolider>application.pool.get(
                className,
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
