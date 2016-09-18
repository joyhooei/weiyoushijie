class CastBullet extends Bullet {
    /**起始坐标*/
    protected _initX: number;
    protected _initY: number;

    protected _flyHeight: number;
    
    protected _gravity: number;
    
    protected _flyTicks: number;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._flyHeight = this._get(properties, 'flyHeight', 25);
        this._gravity   = this._get(properties, 'gravity', 1);

        this._flyTicks = 0;
    }

    protected _idle() {
        this._initX = this.x;
        this._initY = this.y;
        
        super._idle();
    }
    
    protected _computeSteps(x:number, y:number): boolean {
	    this._stepX = (x - this._initX) / this._flyHeight;
	    this._stepY = ((y - this._initY) - (this._gravity * this._flyHeight * this._flyHeight / 2)) / this._flyHeight;

        return this._stepX != 0 && this._stepY != 0;
    }
    
    protected _moveOneStep():boolean {
        this._flyTicks += 0.5;
        
        this.x = this._initX + this._flyTicks * this._stepX;
        this.y = this._initY + this._flyTicks * this._stepY + this._gravity * this._flyTicks * this._flyTicks / 2;
        
        this._flyTicks += 0.5;
        
        var sx: number = this._initX + this._flyTicks * this._stepX;
        var sy: number = this._initY + this._flyTicks * this._stepY + this._gravity * this._flyTicks * this._flyTicks / 2;
        var dx: number = sx - this.x;
        var dy: number = sy - this.y;
        
        this._flyTicks -= 0.5;
        
        let angle = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        if(angle > 180 && angle < 360) {
            var disx: number = this.x - this._target.x < 0 ? this._target.x - this.x : this.x - this._target.x;
            var disy: number = this.y - this._target.y < 0 ? this._target.y - this.y : this.y - this._target.y;
    
            if(disx <= this._stepX && disy < this._stepY) {
                return true;
            }
        }
        
        return false;
    }
}
