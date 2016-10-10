//https://github.com/amibug/fly/blob/master/src/fly.js
class CastBullet extends Bullet {
    protected _curvature: number;
    protected _vertexX: number;
	protected _vertexY: number;

	protected _startX: number;
	protected _startY: number;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

		this._startX = 0;
		this._startY = 0;
		
        this._curvature = 0;
		this._vertexX = 0;
		this._vertexY = 0;
    }

	protected _idle() {
		this._startX = this.x;
		this._startY = this.y;
		
		super._idle();
	}
    
    protected _computeSteps(x:number, y:number): boolean {
		this._targetX = x;
		this._targetY = y;
		
		this._vertexY = Math.min(this._startY, this._targetY) - Math.abs(this._startX - this._targetX) / 3;
		if (this._vertexY < 20) {
        	// 可能出现起点或者终点就是运动曲线顶点的情况
        	this._vertexY = Math.min(20, Math.min(this._startY, this._targetY));
      	}
		
        // 元素移动次数
		let distance = Math.sqrt(Math.pow(this._startY - this._targetY, 2) + Math.pow(this._startX - this._targetX, 2));
        this._totalSteps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / this._moveSpeed);
		
		let ratio = 0;
		if (this._startY != this._vertexY) {
        	ratio = -Math.sqrt((this._targetY - this._vertexY) / (this._startY - this._vertexY));
		}
        this._vertexX = (ratio * this._startX - this._targetX) / (ratio - 1);
			
        // 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
        this._curvature = 0;
		if (this._targetX != this._vertexX) {
			this._curvature = (this._targetY - this._vertexY) / Math.pow(this._targetX - this._vertexX, 2);
		}
		
		this._steps = -1;
		return this._totalSteps > 0;
    }
    
    protected _moveOneStep():boolean {
		this.x = this._startX + (this._targetX - this._startX) * this._steps / this._totalSteps;
		
		if (this._curvature == 0) {
			this.y = this._startY + (this._targetY - this._startY) * this._steps / this._totalSteps;
		} else {
			this.y = this._curvature * Math.pow(this.x - this._vertexX, 2) + this._vertexY;
		}

		this._steps++;
		
		return this._steps >= this._totalSteps - 1;
    }
}
