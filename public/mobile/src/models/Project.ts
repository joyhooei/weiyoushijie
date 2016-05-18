class Project {
	//价格/金币
	private _priceLevelOne: number;
	//产量
	private _outputLevelOne: number;
	
	//价格系数和产量系数: {lowerLevel: 2, upperLevel: 99, priceRatio: 1.05, outputRatio: 1}
	private _levelRatios: any[];
	
	//成就产量系数和成就价格/金币: {level: 50, outputRatio: 2, priceUseGold: 1.00E+03, priceUseDiamond: 100}
	private _achieves: any[];
	
	//升级道具价格/钻石
	private _propPrice: number;
	//道具产量系数 线性
	private _propOutputRatio: number;
	
	constructor(priceLevelOne: number, outputLevelOne: number, propPrice: number, propOutputRatio: number) {
		this._priceLevelOne = priceLevelOne;
		this._outputLevelOne = outputLevelOne;
		this._propPrice = propPrice;
		this._propOutputRatio = propOutputRatio;
		
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
	
    public addAchieve(level: number,outputRatio: number,priceUseGold: number, priceUseDiamond: number) {
		this._achieves.push({level: level, outputRatio: outputRatio, priceUseGold: priceUseGold, priceUseDiamond: priceUseDiamond});
	}
	
    static createAllProjects(): Array<Project> {
		let projects = new Array<Project>();
		
		projects.push(Project.createProjectOne());
		projects.push(Project.createProjectTwo());
		projects.push(Project.createProjectThree());
		projects.push(Project.createProjectFour());
		projects.push(Project.createProjectFive());
		projects.push(Project.createProjectSix());
		projects.push(Project.createProjectSeven());
		projects.push(Project.createProjectEight());
		projects.push(Project.createProjectNine());
		projects.push(Project.createProjectTen());
		projects.push(Project.createProjectEleven());
		projects.push(Project.createProjectTwelve());
		projects.push(Project.createProjectThirteen());
		projects.push(Project.createProjectFourteen());
		projects.push(Project.createProjectFifteen());
		projects.push(Project.createProjectSixteen());
		projects.push(Project.createProjectSeventeen());
		projects.push(Project.createProjectEighteen());
		projects.push(Project.createProjectNinteen());
		projects.push(Project.createProjectTwenty());
		
		return projects;
	}
	
	static createProjectOne(): Project {
		//priceLevelOne: number, outputLevelOne: number, propPrice: number, propOutputRatio: number
		let project = new Project(1, 1, 100, 0.1);
		
		//lowerLevel: number, upperLevel: number, priceRatio: number, outputRatio: number
		project.addLevelRatio(2, 99, 1.05, 1);
		project.addLevelRatio(100, 199, 1.05, 1);
		project.addLevelRatio(200, 299, 1.05, 1);
		project.addLevelRatio(300, 399, 1.05, 1);
		
		project.addLevelRatio(400, 499, 1.03, 1);
		project.addLevelRatio(500, 599, 1.03, 1.01);
		project.addLevelRatio(600, 699, 1.03, 1.01);
		project.addLevelRatio(700, 799, 1.03, 1.01);
		project.addLevelRatio(800, 899, 1.03, 1.01);
		project.addLevelRatio(900, 999, 1.03, 1.01);
		
		project.addLevelRatio(1000, 1199, 1.02, 1.005);
		project.addLevelRatio(1200, 1399, 1.02, 1.005);
		project.addLevelRatio(1400, 1599, 1.02, 1.005);
		project.addLevelRatio(1600, 1799, 1.02, 1.005);
		project.addLevelRatio(1800, 1999, 1.02, 1.005);
		project.addLevelRatio(2000, 2499, 1.02, 1.005);
		project.addLevelRatio(2500, 2999, 1.02, 1.005);
		project.addLevelRatio(3000, 3499, 1.02, 1.005);
		project.addLevelRatio(3500, 3999, 1.02, 1.005);
		project.addLevelRatio(4000, 4499, 1.02, 1.005);
		project.addLevelRatio(4500, 4999, 1.02, 1.005);
		
		project.addLevelRatio(5000, 5999, 1.01, 1.005);
		project.addLevelRatio(6000, 6999, 1.01, 1.005);
		project.addLevelRatio(7000, 7999, 1.01, 1.005);
		project.addLevelRatio(8000, 8999, 1.01, 1.005);
		project.addLevelRatio(9000, 9999, 1.01, 1.005);
		project.addLevelRatio(10000, 99999, 1.01, 1.005);
		
		//level: number, outputRatio: number, prieUseGold: number, priceUseDiamond: number
		project.addAchieve(50, 		2, 							1000, 					100);
		project.addAchieve(100, 	5, 							5000, 					100);
		project.addAchieve(200, 	5, 							5000, 					100);
		project.addAchieve(300, 	5, 							5000, 					100);
		project.addAchieve(500, 	1000, 						100000, 				1000);
		project.addAchieve(1000, 	1000, 						100000000, 				1000);
		project.addAchieve(2000, 	1000000, 					100000000000, 			2000);
		project.addAchieve(5000, 	1000000000, 				10000000000000, 		2000);
		project.addAchieve(10000, 	1000000000000000, 			100000000000000000, 	5000);
		project.addAchieve(100000, 	10000000000000000000000000, 1000000000000000000000, 10000);
		
		return project;
	}
	
	static createProjectTwo(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectThree(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectFour(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectFive(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectSix(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectSeven(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectEight(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectNine(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectTen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectEleven(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectTwelve(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectThirteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectFourteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectFifteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectSixteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectSeventeen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectEighteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectNinteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	static createProjectTwenty(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
        return this.createProjectOne();
	}
	
	//根据级别、成就和道具个数计算本项目的秒产
	public output(level: number, achieve: number):number {
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
        return Math.round(level * this._outputLevelOne * cumulativeOutputRatio * cumulativeAchieveRatio);
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

    public diamondPriceOfAchieve(achieve: number): number {
        return this._achieves[achieve].priceUseDiamond;
    }
    
    public goldPriceOfAchieve(achieve: number): number {
        return this._achieves[achieve].priceUseGold;
    }
	
	public levelOfAchieve(achieve: number): number {
		return this._achieves[achieve].level;
	}
}