class CastBullet extends Bullet {
	//y = a * x * x + b * x + c
    protected _a: number;
    protected _b: number;

	protected _startX: number;
	protected _startY: number;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._a = 0.001;
		this._b = 0;
    }

	protected _idle() {
		this._startX = this.x;
		this._startY = this.y;
		
		super._idle();
	}
    
    protected _computeSteps(x:number, y:number): boolean {
		let dx = x - this.x;
		let dy = y - this.y;
		
		if (Math.abs(dx) < this._moveSpeed && Math.abs(dy) < this._moveSpeed) {
			return true;
		} else {
			this._b     = (dy - this._a * dx * dx) / dx;
			this._rate  = dx > 0 ? 1: -1;
			this._stepX = 0;

        	return false;
		}
    }
    
    protected _moveOneStep():boolean {
		// 切线 y=2ax+b
		let stepY = 2 * this._a * this._stepX + this._b;
		
		// y*y + x*x = speed * speed
		// (tangent * x)^2 + x*x = speed * speed
		// x = Math.sqr(speed / (tangent * tangent + 1));
		this._stepX += this._rate * this._moveSpeed * Math.sqrt( 1 / ((stepY * stepY) / (this._stepX * this._stepX) + 1));

		// 防止过界
		this.x = this._startX + this._stepX;
		if ((this._rate == 1 && this.x > this._targetX) || (this._rate == -1 && this.x < this._targetX)) {
			this.x = this._targetX;
			this.y = this._targetY;
			
			return true;
		} else {
			this.y = this._startY + this._a * this._stepX * this._stepX + this._b * this._stepX;

			return false;
		}
    }
}
