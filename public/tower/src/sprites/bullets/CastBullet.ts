//https://github.com/amibug/fly/blob/master/src/fly.js
class CastBullet extends Bullet {
	/**
	 * ======================================================
	 * 运动轨迹在页面中的y值可以抽象成函数 y = a * x * x + b;
	 * ======================================================
	*/
    protected _a: number;
	protected _b: number;

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
		let vertexY = Math.min(this._startY, this._targetY) - Math.abs(this._startX - this._targetX) / 3;
		if (vertexY < 10) {
        	// 可能出现起点或者终点就是运动曲线顶点的情况
        	vertexY = Math.min(10, Math.min(this._startY, this._targetY));
      	}
		
		let ratio = 0;
		if (this._startY != vertexY) {
        	ratio = (this._targetY - vertexY) / (this._startY - vertexY);
		}
        let vertexX = (ratio * this._targetX * this._targetX - this._startX * this._startX) / (ratio - 1);

        // 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
        let curvature = 0;
		if (this._targetX != vertexX) {
			// a = (y - b ) / (x * x)
			curvature = (this._targetY - vertexY) / Math.pow(this._targetX, 2);
		}
		
		this._a = curvature;
		this._b = vertexY;
		this._steps = -1;
		
        //移动距离和移动步数
		let distance = Math.sqrt(Math.pow(this._startY - this._targetY, 2) + Math.pow(this._startX - this._targetX, 2));
        this._totalSteps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / this._moveSpeed);
		
		return this._totalSteps > 0;
    }
    
    protected _moveOneStep():boolean {
		if (this._steps < this._totalSteps - 1) {
			this.x = this._startX + (this._targetX - this._startX) * this._steps / this._totalSteps;
			
			if (this._a == 0) {
				this.y = this._startY + (this._targetY - this._startY) * this._steps / this._totalSteps;
			} else {
				this.y = this._a * Math.pow(this.x, 2) + this._b;
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
