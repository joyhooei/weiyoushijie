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
	    let stepX = (x - this._initX) / this._flyHeight;
	    let stepY = ((y - this._initY) - (this._gravity * this._flyHeight * this._flyHeight / 2)) / this._flyHeight;
	    
	    this._delta = [stepX, stepY];

        return stepX != 0 && stepY != 0;
    }
    
    protected _moveOneStep():boolean {
        this._flyTicks += 0.5;
        
        this.x = this._initX + this._flyTicks * this._delta[0];
        this.y = this._initY + this._flyTicks * this._delta[1] + this._gravity * this._flyTicks * this._flyTicks / 2;
        
        this._flyTicks += 0.5;
        
        var sx: number = this._initX + this._flyTicks * this._delta[0];
        var sy: number = this._initY + this._flyTicks * this._delta[1] + this._gravity * this._flyTicks * this._flyTicks / 2;
        var dx: number = sx - this.x;
        var dy: number = sy - this.y;
        
        this._flyTicks -= 0.5;
        
        let angle = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        if(angle > 180 && angle < 360) {
            var disx: number = this.x - this._target.x < 0 ? this._target.x - this.x : this.x - this._target.x;
            var disy: number = this.y - this._target.y < 0 ? this._target.y - this.y : this.y - this._target.y;
    
            if(disx <= this._delta[0] && disy < this._delta[1]) {
                return true;
            }
        }
        
        return false;
    }
}
