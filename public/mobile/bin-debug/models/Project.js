var Project = (function () {
    function Project(priceLevelOne, outputLevelOne, propPrice, propOutputRatio) {
        this._priceLevelOne = priceLevelOne;
        this._outputLevelOne = outputLevelOne;
        this._propPrice = propPrice;
        this._propOutputRatio = propOutputRatio;
        this._levelRatios = new Array();
        this._achieves = new Array();
    }
    var d = __define,c=Project,p=c.prototype;
    p.addLevelRatio = function (lowerLevel, upperLevel, priceRatio, outputRatio) {
        var outputBase = this._outputLevelOne;
        if (this._levelRatios.length > 0) {
            outputBase = this.output(this._levelRatios[this._levelRatios.length - 1].upperLevel, 0, 0);
        }
        var priceBase = this._priceLevelOne;
        if (this._levelRatios.length > 0) {
            priceBase = this.priceOf(this._levelRatios[this._levelRatios.length - 1].upperLevel);
        }
        this._levelRatios.push({ lowerLevel: lowerLevel, upperLevel: upperLevel, priceRatio: priceRatio, outputRatio: outputRatio, outputBase: outputBase, priceBase: priceBase });
    };
    p.addAchieve = function (level, outputRatio, priceUseGold, priceUseDiamond) {
        this._achieves.push({ level: level, outputRatio: outputRatio, priceUseGold: priceUseGold, priceUseDiamond: priceUseDiamond });
    };
    Project.createAllProjects = function () {
        var projects = new Array();
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
    };
    Project.createProjectOne = function () {
        //priceLevelOne: number, outputLevelOne: number, propPrice: number, propOutputRatio: number
        var project = new Project(1, 1, 100, 0.1);
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
        project.addAchieve(50, 2, 1000, 100);
        project.addAchieve(100, 5, 5000, 100);
        project.addAchieve(200, 5, 5000, 100);
        project.addAchieve(300, 5, 5000, 100);
        project.addAchieve(500, 1000, 100000, 1000);
        project.addAchieve(1000, 1000, 100000000, 1000);
        project.addAchieve(2000, 1000000, 100000000000, 2000);
        project.addAchieve(5000, 1000000000, 10000000000000, 2000);
        project.addAchieve(10000, 1000000000000000, 100000000000000000, 5000);
        project.addAchieve(100000, 10000000000000000000000000, 1000000000000000000000, 10000);
        return project;
    };
    Project.createProjectTwo = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectThree = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectFour = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectFive = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectSix = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectSeven = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectEight = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectNine = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectTen = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectEleven = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectTwelve = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectThirteen = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectFourteen = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectFifteen = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectSixteen = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectSeventeen = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectEighteen = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectNinteen = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    Project.createProjectTwenty = function () {
        var project = new Project(1, 1, 100, 0.1);
        project.addLevelRatio(2, 99, 1.05, 1);
        return project;
    };
    //根据级别、成就和道具个数计算本项目的秒产
    p.output = function (level, achieve, props) {
        //累积产量系数	判定lv所处区间。累积产量系数=上区间最终值*本区间产量系数^ (lv-上区间最终lv值）
        var cumulativeOutputRatio = 1;
        var lastLevel = 1;
        for (var i = 1; i <= this._levelRatios.length; i++) {
            var ratios = this._levelRatios[i - 1];
            if (level >= ratios.lowerLevel && level <= ratios.upperLevel) {
                cumulativeOutputRatio = ratios.outputBase * Math.pow(ratios.outputRatio, (level - lastLevel));
                break;
            }
            else {
                lastLevel = ratios.upperLevel;
            }
        }
        //累积成就系数	开通的各个成就系数相乘
        var cumulativeAchieveRatio = 1;
        for (var i = 1; i <= this._achieves.length && i <= achieve; i++) {
            cumulativeAchieveRatio = cumulativeAchieveRatio * this._achieves[i - 1].outputRatio;
        }
        //道具提升系数	道具升级次数*0.1
        var propRatio = 1 + achieve * this._propOutputRatio;
        //项目秒产 	lv数*该项目1级秒产*累积产量系数*累积成就系数*道具升级系数
        return Math.round(level * this._outputLevelOne * cumulativeOutputRatio * cumulativeAchieveRatio * propRatio);
    };
    //升级级别的价格
    p.priceOf = function (level) {
        //累积价格系数	判定lv所处区间。累积价格系数=上区间最终值*本区间价格系数^ (lv-上区间最终lv值）
        var cumulativePriceRatio = 1;
        var lastLevel = 1;
        for (var i = 1; i <= this._levelRatios.length; i++) {
            var ratios = this._levelRatios[i - 1];
            if (level >= ratios.lowerLevel && level <= ratios.upperLevel) {
                cumulativePriceRatio = ratios.priceBase * Math.pow(ratios.priceRatio, (level - lastLevel));
                break;
            }
            else {
                lastLevel = ratios.upperLevel;
            }
        }
        return Math.round(level * this._priceLevelOne * cumulativePriceRatio);
    };
    //连续升级，从levelFrom到levelTo的价格
    p.price = function (level, step) {
        var p = 0;
        for (var i = level; i < level + step; i++) {
            p = p + this.priceOf(i);
        }
        return p;
    };
    p.diamondPriceOfAchieve = function (achieve) {
        return this._achieves[achieve].priceUseDiamond;
    };
    p.goldPriceOfAchieve = function (achieve) {
        return this._achieves[achieve].priceUseGold;
    };
    return Project;
}());
egret.registerClass(Project,'Project');
