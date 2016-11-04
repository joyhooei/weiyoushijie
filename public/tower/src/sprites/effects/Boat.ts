class Boat extends Effect {
	private _callback: Function;

    public constructor() {
        super();
        
        this.addClip("boat_east_moving");
    }
    
    public initialize(properties: any) {
        super.initialize(properties);
        
        this._callback = null;
    }

	public setCallback(cb:Function) {
		this._callback = cb;
	}
	
	protected _idle() {
		this.guard();
	}
	
	protected _act() {
		if (this._callback) {
			this._callback(this);
			this._callback = null;
		}

		return false;
	}
}
