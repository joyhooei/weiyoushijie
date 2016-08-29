class Hero extends Soldier implements {
    protected _warriors: Soldier[];
    
    public constructor() {
        super();
        
        this._warriors = [];
    }
}
