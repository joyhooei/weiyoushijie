class SoldierCreator enxtends Entity {
    private _createSpeed: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._createSpeed = this._get(properties, "createSpeed", 100);
    }    
    
    public create(soldier: Soldier):Soldier {
        return null;
    }
}
