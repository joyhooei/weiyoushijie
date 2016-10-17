class GuardRange extends Entity {
    private _guardRadius: number;
    
	public constructor() {
        super();
	}
	
    public initialize(properties:any) {
		super.initialize(properties);
		
	    this._guardRadius = this._get(properties, "guardRadius", 100);
	}

    protected _idle() {
        this.move();
    }
	
	public paint() {
        this.graphics.clear();
        
		let a = this._guardRadius;
		let b = this._guardRadius / Math.sqrt(2);
		let x = 0;
		let y = a - b;
		
		this.graphics.beginFill(0x009900, 0.2);
		this._drawEllipse(x + a, y + b, a, b);
		this.graphics.endFill();
		
        this.graphics.lineStyle(1, 0x990000);
        this._drawEllipse(x + a, y + b, a, b);
        this.graphics.endFill();
	}

	/**
		x为椭圆中心横坐标，
		y为椭圆中心纵坐标，
		a为椭圆横半轴长，
		b为椭圆纵半轴长。
	**/
	private _drawEllipse(x: number, y: number, a: number, b: number) {
		var k = .5522848,
		ox = a * k, // 水平控制点偏移量
		oy = b * k; // 垂直控制点偏移量
		
		//从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
		this.graphics.moveTo(x - a, y);
		
		this.graphics.cubicCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
		this.graphics.cubicCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
		this.graphics.cubicCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
		this.graphics.cubicCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
	}
}
