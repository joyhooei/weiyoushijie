class Project {
	//价格/金币
	private _priceLevelOne: number;
	//产量
	private _outputLevelOne: number;
	
	//价格系数和产量系数: {lowerLevel: 2, upperLevel: 99, priceRatio: 1.05, outputRatio: 1}
	private _levelRatios: any[];
	
	//成就产量系数和成就价格/金币: {level: 50, outputRatio: 2, priceUseGold: 1.00E+03, priceUseDiamond: 100}
	private _achieves: any[];
	
	constructor(priceLevelOne: number, outputLevelOne: number) {
		this._priceLevelOne = priceLevelOne;
		this._outputLevelOne = outputLevelOne;
		
        this._levelRatios = new Array<any>();
        this._achieves = new Array<any>();
    }
	
	public addLevelRatio(lowerLevel: number, upperLevel: number, priceRatio: number, outputRatio: number) {
		let outputBase = this._outputLevelOne;
		if (this._levelRatios.length > 0) {
			outputBase = this.output(this._levelRatios[this._levelRatios.length - 1].upperLevel, 0, 0);
		}
		
		let priceBase = this._priceLevelOne;
		if (this._levelRatios.length > 0) {
			priceBase = this.priceOf(this._levelRatios[this._levelRatios.length - 1].upperLevel);
		}
		
		this._levelRatios.push({lowerLevel: lowerLevel, upperLevel: upperLevel, priceRatio: priceRatio, outputRatio: outputRatio, outputBase: outputBase, priceBase: priceBase});
	}
	
    public addAchieve(level: number,outputRatio: number, priceUseDiamond: number, priceUseGold: number) {
		this._achieves.push({level: level, outputRatio: outputRatio, priceUseGold: priceUseGold, priceUseDiamond: priceUseDiamond});
	}
	
    static createAllProjects(): Array<Project> {
		let projects = new Array<Project>();
		
		let data = [
			[1, 	1, 	  2, 1000],
			[10, 	5, 	  2, 1000],
			[300, 	25,   2, 1000],
			[6000, 	160,  2, 1000],
			[300000, 3200, 2, 1000],
			
			[45000000, 			64000,     4, 1000],
			[6750000000, 		320000,    4, 1000],
			[1350000000000, 	6400000,   4, 1000],
			[270000000000000, 	32000000,  4, 1000],
			[54000000000000000, 640000000, 4, 1000],
			
			[10800000000000000000, 			3200000000, 	8, 10000],
			[2160000000000000000000, 		64000000000,    8, 10000],
			[432000000000000000000000, 		320000000000,   8, 10000],
			[86400000000000000000000000, 	6400000000000,  8, 10000],
			[17300000000000000000000000000, 32000000000000, 8, 10000],
			
			[3460000000000000000000000000000, 			640000000000000, 	 16, 10000],
			[691000000000000000000000000000000, 		3200000000000000,    16, 10000],
			[138000000000000000000000000000000000, 		64000000000000000,   16, 10000],
			[27600000000000000000000000000000000000, 	320000000000000000,  16, 10000],
			[5530000000000000000000000000000000000000, 	6400000000000000000, 16, 10000]	
		];

		for (var i = 0; i < data.length; i++) {
			projects.push(Project.createProject(data[i][0], data[i][1], data[i][2], data[i][3]));
		}
		
		return projects;
	}
	
	static createProject(priceLevelOne: number, outputLevelOne: number, achieve1OutputRatio:number, achieve5OutputRatio:number): Project {
		let project = new Project(priceLevelOne, outputLevelOne);
		
		//lowerLevel: number, upperLevel: number, priceRatio: number, outputRatio: number
		project.addLevelRatio(2, 99, 1.05, 1);
		project.addLevelRatio(100, 199, 1.05, 1);
		
		project.addLevelRatio(200, 299, 1.03, 1);
		project.addLevelRatio(300, 399, 1.03, 1);
		project.addLevelRatio(400, 499, 1.03, 1);
		
		project.addLevelRatio(500, 599, 1.05, 1.01);
		project.addLevelRatio(600, 699, 1.03, 1.01);
		project.addLevelRatio(700, 799, 1.02, 1.01);
		project.addLevelRatio(800, 899, 1.02, 1.01);
		project.addLevelRatio(900, 999, 1.02, 1.01);
		
		project.addLevelRatio(1000, 1199, 1.03, 1.005);
		project.addLevelRatio(1200, 1399, 1.02, 1.005);
		project.addLevelRatio(1400, 1599, 1.02, 1.005);
		project.addLevelRatio(1600, 1799, 1.02, 1.005);
		project.addLevelRatio(1800, 1999, 1.02, 1.005);
		project.addLevelRatio(2000, 2499, 1.01, 1.005);
		project.addLevelRatio(2500, 2999, 1.02, 1.005);
		project.addLevelRatio(3000, 3499, 1.01, 1.005);
		project.addLevelRatio(3500, 3999, 1.01, 1.005);
		project.addLevelRatio(4000, 4499, 1.01, 1.005);
		project.addLevelRatio(4500, 4999, 1.01, 1.005);
		
		project.addLevelRatio(5000, 5999, 1.01, 1.005);
		project.addLevelRatio(6000, 6999, 1.01, 1.005);
		project.addLevelRatio(7000, 7999, 1.007, 1.005);
		project.addLevelRatio(8000, 8999, 1.007, 1.003);
		project.addLevelRatio(9000, 9999, 1.007, 1.003);
		project.addLevelRatio(10000, 99999, 1.003, 1.002);
		
		//level: number, outputRatio: number, priceUseDiamond: number, prieUseGold: number
		project.addAchieve(50, 		achieve1OutputRatio, 		100, 	1000);
		project.addAchieve(100, 	achieve1OutputRatio * 2, 	100, 	1190);
		project.addAchieve(200, 	achieve1OutputRatio * 4, 	100, 	157000);
		project.addAchieve(300, 	achieve1OutputRatio * 8, 	100, 	6030000);
		project.addAchieve(500, 	achieve5OutputRatio, 		1000, 	10000000000);
		project.addAchieve(1000, 	achieve5OutputRatio, 		2000, 	100000000000000000);
		project.addAchieve(2000, 	achieve5OutputRatio, 		3000, 	50000000000000000000000000);
		project.addAchieve(5000, 	10000, 		 				4000, 	800000000000000000000000000000000000000000000000000);
		project.addAchieve(10000, 	1000000, 	 				5000, 	40000000000000000000000000000000000000000000000000000000000000000);
		project.addAchieve(100000, 	10000000000, 				10000,	100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
		
		return project;
	}
	
	//根据级别、成就和道具个数计算本项目的秒产
	public output(level: number, achieve: number, toolRatio:number):number {
		//累积产量系数	判定lv所处区间。累积产量系数=上区间最终值*本区间产量系数^ (lv-上区间最终lv值）
		let cumulativeOutputRatio = 1;
		let lastLevel = 1;
		for (var i = 1; i <= this._levelRatios.length; i++) {
			let ratios = this._levelRatios[i - 1];
			
			if (level >= ratios.lowerLevel && level <= ratios.upperLevel) {
				cumulativeOutputRatio = ratios.outputBase * Math.pow(ratios.outputRatio, (level - lastLevel));
				
				break;
			} else {
				lastLevel = ratios.upperLevel;
			}
		}
		
		//累积成就系数	开通的各个成就系数相乘
		let cumulativeAchieveRatio = 1;
		for (var i = 1; i <= this._achieves.length && i <= achieve; i++) {
			cumulativeAchieveRatio = cumulativeAchieveRatio * this._achieves[i - 1].outputRatio;
		}
		
		//项目秒产 	lv数*该项目1级秒产*累积产量系数*累积成就系数*道具升级系数
        return Math.round(level * this._outputLevelOne * cumulativeOutputRatio * cumulativeAchieveRatio * toolRatio);
	}
	
	//升级级别的价格
	public priceOf(level: number): number {
		//累积价格系数	判定lv所处区间。累积价格系数=上区间最终值*本区间价格系数^ (lv-上区间最终lv值）
		let cumulativePriceRatio = 1;
		let lastLevel = 1;
		for (var i = 1; i <= this._levelRatios.length; i++) {
			var ratios = this._levelRatios[i - 1];
			
            if(level >= ratios.lowerLevel && level <= ratios.upperLevel) {
				cumulativePriceRatio = ratios.priceBase * Math.pow(ratios.priceRatio, (level - lastLevel));
				
				break;
			} else {
				lastLevel = ratios.upperLevel;
			}
		}
		
		return Math.round(level * this._priceLevelOne * cumulativePriceRatio);
	}
	
	//连续升级，从levelFrom到levelTo的价格
    public price(level: number, step: number): number {
    	let p = 0;
        for(var i = level; i < level + step; i++) {
            p = p + this.priceOf(i);
	    }
	    
	    return p;
	}
	
	public achieve(a: number): any {
		return this._achieves[a - 1];
	}
}