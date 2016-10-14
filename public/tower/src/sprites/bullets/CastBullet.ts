//https://github.com/amibug/fly/blob/master/src/fly.js
class CastBullet extends Bullet {
	/**
	 * ======================================================
	 * 运动轨迹在页面中的y值可以抽象成函数 y = a * x * x + b * x + c;
	 * ======================================================
	*/
    protected _a: number;
	protected _b: number;
	protected _c: number;

	protected _startX: number;
	protected _startY: number;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

		this._startX = 0;
		this._startY = 0;
		
        this._a = 0;
		this._b = 0;
		this._c = 0;
    }

	protected _idle() {
		this._startX = this.x;
		this._startY = this.y;
		
		super._idle();
	}
    
    protected _computeSteps(x:number, y:number, targetX:number, targetY:number): boolean {
		this._targetX = targetX;
		this._targetY = targetY;
		
		//运动轨迹最高点，跨度越大，顶点越高
		var topY = Math.min(this._startY, this._targetY) - Math.abs(this._startX - this._targetX) / 3;
		if (topY < 30) {
		  	// 可能出现起点或者终点就是运动曲线顶点的情况
		  	topY = Math.min(30, Math.min(this._startY, this._targetY));
		}

		var topX = Math.ceil((this._targetX - this._startX) * 2 / 3);

		this._a = ((this._targetY - this._startY) / (this._targetX - this._startX) - (this._topY - this._startY) / (this._topX - this._startX)) / (this._targetX - this._topX);
		this._b = ((this.targetY - this._startY) - this._a * (this._targetX * this._targetX - this._startX * this._startX) ) / (this._targetX - this._startX);
		this._c = this._targetY - this._a * this._targetX * this._targetX - this._b * this._targetX;
		
		var distance = Math.sqrt(Math.pow(this._startY - this._targetY, 2) + Math.pow(this._startX - this._targetX, 2));
		this._totalSteps = Math.ceil(distance / this._moveSpeed);		
		
		this._steps = 0;
		return this._totalSteps > 0;
    }
    
    protected _moveOneStep():boolean {
		if (this._steps < this._totalSteps) {
			this.x = this._startX + (this._targetX - this._startX) * this._steps / this._totalSteps;
			this.y = this._a * this.x * this.x + this._b * this.x + this._c;

			this._steps++;

			return false;
		} else {
			this.x = this._targetX;
			this.y = this._targetY;

			return true;
		}
    }
}
