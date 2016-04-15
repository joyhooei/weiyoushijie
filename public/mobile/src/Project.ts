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
	}
	
	public addLevelRatio(lowerLevel: number, upperLevel: number, priceRatio: number, outputRatio: number) {
		this._levelRatios.push({lowerLevel: lowerLevel, upperLevel: upperLevel, priceRatio: priceRatio, outputRatio: outputRatio});
	}
	
	public addAchieve(level: number, outputRatio: number, prieUseGold: number, priceUseDiamond: number) {
		this._achieves.push({level: level, outputRatio: outputRatio, priceUseGold: priceUseGold, priceUseDiamond: priceUseDiamond});
	}
	
	static createAllProjects() : Project[] {
		let projects = new Project[];
		
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
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		project.addAchieve(50, 2, 1000, 100);
		
		return project;
	}
	
	static createProjectTwo(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectThree(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectFour(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectFive(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectSix(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectSeven(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectEight(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectNine(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectTen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectEleven(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectTwelve(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectThirteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectFourteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectFifteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectSixteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectSeventeen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectEighteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectNinteen(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	static createProjectTwenty(): Project {
		let project = new Project(1, 1, 100, 0.1);
		project.addLevelRatio(2, 99, 1.05, 1);
		
		return project;
	}
	
	//根据级别、成就和道具个数计算本项目的秒产
	public output(level: number, achieve: number, props: number):number {
		//累积产量系数	判定lv所处区间。累积产量系数=上区间最终值*本区间价格系数^ (lv-上区间最终lv值）
		let cumulativeOutputRatio = 1;
		
		//累积成就系数	开通的各个成就系数相乘
		let cumulativeAchieveRatio = 1;
		for (var i = 1; i <= this._achieves.length && i <= achieve; i++)
			cumulativeAchieveRatio = cumulativeAchieveRatio * this._achieves[i - 1].outputRatio;
		}
		
		//道具提升系数	道具升级次数*0.1
		let propRatio = 1 + achieve * _propOutputRatio;
		
		//项目秒产 	lv数*该项目1级秒产*累积产量系数*累积成就系数*道具升级系数
		return level * this._outputLevelOne * cumulativeOutputRatio * cumulativeAchieveRatio * propRatio
	}
	
	//升级级别的价格
	public upgradeLevelPrice(level: number): number {
		//判定lv所处区间。累积价格系数=上区间最终值*本区间价格系数^ (lv-上区间最终lv值）
		for (var i = 1; i <= this._levelRatios.length; i++)
		}
	}
}