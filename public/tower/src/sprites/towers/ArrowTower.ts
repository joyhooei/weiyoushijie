class ArrowTower extends Tower {
    protected _soldiers: ArrowSoldier[];

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this.removeChildren();
    }

    public guard(){
        super.guard();

        for(let i = 0; i < this._soldiers.length; i++) {
            this.addChild(this._soldiers[i]);
        }       
    }
    
    protected _createSoliders(className:string) {
        this._soldiers.push(this._createSoldier(className, 36, 15));
        this._soldiers.push(this._createSoldier(className, 50, 15));
    }
    
    protected _createSoldier(className:string, x: number, y: number):ArrowSoldier {
        let soldier =  <ArrowSoldier>application.pool.get(className, {"guardX": this.getMapX(), "guardY": this.getMapY(), "guardRadius": this._guardRadius});
                
        soldier.x = x;
        soldier.y = y;   
        
        return soldier;
    }
    
    public update() : boolean {       
        for(let i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].update();
        }

        return super.update();
    }
    
    public paint() {
        super.paint();
        
        for(let i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].paint();
        }
    }        
        
}
