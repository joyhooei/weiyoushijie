class Effect extends Entity {
    protected _idleTicks: number;

    public constructor() {
        super();
    }
    
    public initialize(properties: any) {
        super.initialize(properties);
        
        this._idleTicks = (Math.random() * 10) * application.frameRate;
    }
    
    public paint() {
    	this._play(this._render(), 10);
    }
    
    protected _idle() {
        if (this._ticks > this._idleTicks) {
            this.move();
        } else {        
            this._ticks ++;
        }
    }
    
    protected _moving() {
        if (this._ticks % (application.frameRate << 3) == 0) {
            this.stain();
        }
        
        this._ticks ++;
    }    
}
