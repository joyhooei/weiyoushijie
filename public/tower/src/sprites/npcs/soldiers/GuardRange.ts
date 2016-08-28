class GuardRange extends Entity {
    private _guardRadius: number;
    
	public constructor() {
        super();
	}
	
    public initialize(properties:any) {
		super.initialize(properties);
		
	    this._guardRadius = this._get(properties, "guardRadius", 100);
	}
	
	public paint() {
        this.graphics.clear();
        
        this.graphics.lineStyle(1, 0x009900);
        this.graphics.drawEllipse(0, 0, this._guardRadius, this._guardRadius >> 1);

        this.graphics.endFill();
	}	
}
