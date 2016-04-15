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
		let propRatio = number * (1 + _propOutputRatio);
		
		//项目秒产 	lv数*该项目1级秒产*累积产量系数*累积成就系数*道具升级系数
		return level * _outputLevelOne * cumulativeOutputRatio * cumulativeAchieveRatio * propRatio
	}
	
	//升级级别的价格
	public upgradeLevelPrice(level: number): number {
		//判定lv所处区间。累积价格系数=上区间最终值*本区间价格系数^ (lv-上区间最终lv值）
		for (var i = 1; i <= this._levelRatios.length; i++)
		}
	}
	
	public achievePriceUseGold(level: number): number {
	}
	
	public achievePriceUseDiamond(level: number): number {
	}
}