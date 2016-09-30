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
        
		let x = 0;
		let y = Math.round(this._guardRadius * 0.9);
		let width  = this._guardRadius << 1;
		let height = (this._guardRadius - y) << 1;
		
		this.graphics.beginFill(0x009900, 0.2);
		this.graphics.drawEllipse(x, y, width, height);
		this.graphics.endFill();
		
        this.graphics.lineStyle(3, 0x990000);
        this.graphics.drawEllipse(x, y, width, height);
        this.graphics.endFill();
	}	
}
