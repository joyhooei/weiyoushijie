class Hero extends Solider {
    public constructor() {
        super();
        
        application.map.enableSelect(this);
    }
    
    public select(again:boolean) {
    }
    
    public deselect() {
    }
    
    protected _idle() {
        this._do(ObjectState.guarding);
    }
}
