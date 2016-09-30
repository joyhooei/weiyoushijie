class GuardRange extends Entity {
    private _guardRadius: number;
    
	public constructor() {
        super();
	}
	
    public initialize(properties:any) {
		super.initialize(properties);
		
	    this._guardRadius = this._get(properties, "guardRadius", 100);
	}

    protected _idle() {
        this.move();
    }
	
	public paint() {
        this.graphics.clear();
        
		let delta = Math.round(this._guardRadius * 0.8);
		
		this.graphics.beginFill(0x009900, 0.2);
		this.graphics.drawEllipse(0, delta, this._guardRadius << 1, (this._guardRadius - delta) << 1);
		this.graphics.endFill();
		
        this.graphics.lineStyle(3, 0x990000);
        this.graphics.drawEllipse(0, delta, this._guardRadius << 1, (this._guardRadius - delta) << 1);
        this.graphics.endFill();
	}	
}
