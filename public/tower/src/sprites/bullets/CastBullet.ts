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
		
		if (this._targetX > this._startX) {
			this._parabola(this._startX, this._startY, this._targetX, this._targetY);
		} else if (this._targetX < this._startX) {
			this._parabola(this._targetX, this._targetY, this._startX, this._startY);
		} else {
			this._a = 0;
			this._b = 0;
			this._c = 0;
		}
		
		var distance = Math.sqrt(Math.pow(this._startY - this._targetY, 2) + Math.pow(this._startX - this._targetX, 2));
		this._totalSteps = Math.ceil(distance / this._moveSpeed);		
		
		this._steps = 0;
		return this._totalSteps > 0;
    }

	private  _parabola(x0: number, y0: number, x1: number, y1: number) {
		//运动轨迹最高点，跨度越大，顶点越高
		var y2 = Math.min(y0, y1) - Math.abs(x0 - x1) / 3;
		if (y2 < 30) {
		  	// 可能出现起点或者终点就是运动曲线顶点的情况
		  	y2 = Math.min(30, Math.min(y0, y1));
		}

		var x2 = Math.ceil((x1 - x0) * 2 / 3);

		this._a = ((y1 - y0) / (x1 - x0) - (y2 - y0) / (x2 - x0)) / (x1 - x2);
		this._b = (y1 - y0) / (x1 - x0) - this._a * (x1 + x0);
		this._c = y1 - this._a * x1 * x1 - this._b * x1;
	}
    
    protected _moveOneStep():boolean {
		if (this._steps < this._totalSteps) {
			this.x = this._startX + (this._targetX - this._startX) * this._steps / this._totalSteps;
			if (this._a != 0) {
				this.y = this._a * this.x * this.x + this._b * this.x + this._c;
			} else {
				this.y = this._startY + (this._targetY - this._startY) * this._steps / this._totalSteps;
			}
			
			this._steps++;

			return false;
		} else {
			this.x = this._targetX;
			this.y = this._targetY;

			return true;
		}
    }
}
