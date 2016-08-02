class Tower extends Object
{
    public constructor() {
        super();
    }
    
    protected _idle(ticks:number) {
        this._changeState(ObjectState.building);
    }    
}
