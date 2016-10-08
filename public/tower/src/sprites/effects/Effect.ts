class Effect extends Entity {
    public constructor() {
        super();
    }
    
    public initialize(properties: any) {
        super.initialize(properties);
        
        this.move();
    }
    
    public paint() {
    	this._play(this._render(), 10);
    }
    
    protected _moving() {
        if (this._ticks % (application.frameRate << 3) == 0) {
            this.stain();
        }
        
        this._ticks ++;
    }    
}
