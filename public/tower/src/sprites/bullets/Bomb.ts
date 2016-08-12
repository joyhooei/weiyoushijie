class Bomb extends Bullet {
    /**起始坐标*/
    protected _initX: number;
    protected _initY: number;

    /**飞行角度*/
    protected _angle: number;
    
    protected _flyHeight: number;
    
    protected _gravity: number;
    
    protected _flyTicks: number;
    
    protected _hitRadius: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._flyHeight = this._get(properties, 'flyHeight', 25);
        this._gravity   = this._get(properties, 'gravity', 1);
        
        this._angle = 0;
        
        this._hitRadius = 0;
        
        this._flyTicks = 0;
    }
    
    public setTarget(target: NPC) {
        this._initX = this.x;
        this._initY = this.y;
        
        super.setTarget(target);
    }
    
    public moveTo(x: number, y: number) {
    	this._computeSteps(this._target.x, this._target.y);
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
        this._angle = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        
        this._flyTicks -= 0.5;

        return this._hitTest();
    }
    
    protected _hitTest(): boolean {
        if(this._angle > 180 && this._angle < 360) {
            var disx: number = this.x - this._target.x < 0 ? this._target.x - this.x : this.x - this._target.x;
            var disy: number = this.y - this._target.y < 0 ? this._target.y - this.y : this.y - this._target.y;
    
            if(disx <= this._delta[0] && disy < this._delta[1]) {
                this._hitTarget();
                
                return true;
            } 
        }
        
        return false;
    }
    
    protected _hitTarget() {
        let enemies = application.map.findEnemies(this.x, this.y, this._hitRadius, [0]);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].hitBy(this._damage);
        }    	
    }
    
    protected _computeSteps(x:number, y:number) {
	    let stepX = (x - this._initX) / this._flyHeight;
	    let stepY = ((y - this._initY) - (this._gravity * this._flyHeight * this._flyHeight / 2)) / this._flyHeight;
	    
	    this._delta = [stepX, stepY];
    }
}
