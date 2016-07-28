class Vip {
	//级别
	private _level: number = 0;
	
	//充值
	private _charge: number = 0;
		
    //总秒产加成
	private _output: number = 0;
    
    //暴击收益
    private _hit: number = 10;
	
	//时光沙漏获得收益增加
	private _time: number = 0;
	
	//升级费用减少
	private _upgrade: number = 0;
	
	//勋章碎片
	private _patch: number = 0;
	
	constructor(level: number, charge: number, output: number, hit: number, time: number, upgrade: number, patch: number) {
		this._level = level;
		this._charge = charge;
		this._output = output;
		this._hit = hit;
		this._time = time;
		this._upgrade = upgrade;
		this._patch = patch;
    }
	
	static create(charge: number): Vip {
		//level: number, charge: number, output: number, hit: number, time: number, upgrade: number, patch: number
		let data = [
			[0, 	0, 		0, 			10, 	0, 		0, 				0],
			[1, 	2, 		0.2, 		10, 	0,		0, 				0],
			[2, 	10, 	0.5, 		10, 	0, 		0, 				0],
			[3, 	20, 	1, 			15, 	0, 		0, 				0.03],
			[4, 	30, 	2, 			20, 	0, 		0, 				0.05],
			[5, 	50, 	5, 			25, 	0.5, 	0, 				0.1],
			[6, 	100, 	10, 		30, 	0.7, 	0.9, 			0.12],
			[7, 	200, 	50, 		35, 	1, 		0.99, 			0.15],
			[8, 	300, 	100, 		40, 	1.2, 	0.999, 			0.17],
			[9, 	500, 	500, 		45, 	1.5, 	0.9999, 		0.2],
			[10, 	800, 	800, 		50, 	1.7, 	0.99999, 		0.23],
			[11, 	1000, 	1000, 		55, 	2, 		0.999999, 		0.25],
			[12, 	2000, 	5000,		60, 	2.2, 	0.9999999, 		0.3],
			[13, 	5000, 	50000, 		65, 	2.5, 	0.99999999, 	0.4],
			[14, 	10000, 	1000000, 	70, 	3, 		0.999999999, 	0.5],
			[15, 	15000, 	10000000, 	75, 	3.5, 	0.9999999999, 	0.65],
		];
		
		var d = null;
		for (var i = 0; i < data.length; i ++) {
			if (charge >= data[i][1]) {
				d = data[i];
			} else {
				break;
			}
		}
		
		return new Vip(d[0], d[1], d[2], d[3], d[4], d[5], d[6]);
	}
	
	public getOutput(output: number): number {
		return output * (1 + this._output);
	}
	
    public getHit(gold: number): number {
		return gold * this._hit;
	}
	
    public getHitRatio(): number {
		return this._hit;
	}
	
    public getTime(gold: number) : number {
		return gold * (1 + this._time);
	}
	
    public getUpgrade(price: number): number {
		return price * (1 - this._upgrade);
	}
	
	public getLevel(): number {
	    return this._level;
	}
}
