var Project = (function () {
    function Project(priceLevelOne, outputLevelOne) {
        this._priceLevelOne = priceLevelOne;
        this._outputLevelOne = outputLevelOne;
        this._levelRatios = new Array();
        this._achieves = new Array();
    }
    var d = __define,c=Project,p=c.prototype;
    p.addLevelRatio = function (lowerLevel, upperLevel, priceRatio, outputRatio) {
        var outputRatioBase = 1;
        var priceRatioBase = 1;
        if (this._levelRatios.length > 0) {
            var lastRatio = this._levelRatios[this._levelRatios.length - 1];
            var levels = lastRatio.upperLevel - lastRatio.lowerLevel + 1;
            outputRatioBase = lastRatio.outputRatioBase * Math.pow(lastRatio.outputRatio, levels);
            priceRatioBase = lastRatio.priceRatioBase * Math.pow(lastRatio.priceRatio, levels);
        }
        this._levelRatios.push({ lowerLevel: lowerLevel, upperLevel: upperLevel, priceRatioBase: priceRatioBase, outputRatioBase: outputRatioBase, priceRatio: priceRatio, outputRatio: outputRatio });
    };
    p.addAchieve = function (level, outputRatio, priceUseDiamond, priceUseGold) {
        this._achieves.push({ level: level, outputRatio: outputRatio, priceUseGold: priceUseGold, priceUseDiamond: priceUseDiamond });
    };
    Project.createAll = function () {
        var projects = new Array();
        var data = [
            [1, 1, 2, 1000],
            [10, 5, 2, 1000],
            [300, 25, 2, 1000],
            [6000, 160, 2, 1000],
            [300000, 3200, 2, 1000],
            [45000000, 64000, 4, 1000],
            [6750000000, 320000, 4, 1000],
            [1350000000000, 6400000, 4, 1000],
            [270000000000000, 32000000, 4, 1000],
            [54000000000000000, 640000000, 4, 1000],
            [10800000000000000000, 3200000000, 8, 10000],
            [2160000000000000000000, 64000000000, 8, 10000],
            [432000000000000000000000, 320000000000, 8, 10000],
            [86400000000000000000000000, 6400000000000, 8, 10000],
            [17300000000000000000000000000, 32000000000000, 8, 10000],
            [3460000000000000000000000000000, 640000000000000, 16, 10000],
            [691000000000000000000000000000000, 3200000000000000, 16, 10000],
            [138000000000000000000000000000000000, 64000000000000000, 16, 10000],
            [27600000000000000000000000000000000000, 128000000000000000, 16, 10000],
            [5530000000000000000000000000000000000000, 256000000000000000, 16, 10000]
        ];
        var achievePrices = [
            [1.19E+02, 1.19E+03, 1.57E+05, 6.03E+06, 1.00E+10, 1.00E+17, 5.00E+25, 8.00E+50, 4.00E+64, 1.00E+200],
            [1.19E+03, 1.19E+04, 1.57E+06, 6.03E+07, 5.00E+13, 1.00E+19, 2.50E+27, 8.00E+52, 6.00E+66, 1.00E+200],
            [3.58E+04, 3.58E+05, 4.71E+07, 1.81E+09, 4.00E+14, 2.00E+20, 1.25E+29, 4.00E+54, 9.00E+68, 1.00E+200],
            [7.16E+05, 7.16E+06, 9.41E+08, 3.62E+10, 2.00E+15, 1.00E+21, 6.25E+30, 4.00E+56, 1.35E+71, 1.00E+200],
            [3.58E+07, 3.58E+08, 4.71E+10, 1.81E+12, 4.00E+16, 5.00E+21, 3.13E+32, 4.00E+58, 2.03E+73, 1.00E+200],
            [5.37E+09, 5.37E+10, 7.06E+12, 2.71E+14, 1.60E+18, 2.50E+23, 6.25E+34, 4.00E+60, 3.04E+75, 1.00E+200],
            [8.05E+11, 8.05E+12, 1.06E+15, 4.07E+16, 1.60E+19, 5.00E+25, 1.25E+37, 4.00E+62, 4.56E+77, 1.00E+200],
            [1.61E+14, 1.61E+15, 2.12E+17, 8.14E+18, 1.60E+21, 1.00E+28, 2.50E+39, 4.00E+64, 6.83E+79, 1.00E+200],
            [3.22E+16, 3.22E+17, 4.23E+19, 1.63E+21, 8.00E+22, 2.00E+30, 5.00E+41, 8.00E+66, 1.37E+82, 1.00E+200],
            [6.44E+18, 6.44E+19, 8.47E+21, 3.26E+23, 1.60E+25, 4.00E+32, 1.00E+44, 1.60E+69, 2.73E+84, 1.00E+200],
            [1.29E+21, 1.29E+22, 1.69E+24, 6.51E+25, 3.20E+27, 8.00E+34, 2.00E+46, 3.20E+71, 5.47E+86, 1.00E+200],
            [2.58E+23, 2.58E+24, 3.39E+26, 1.30E+28, 6.40E+29, 1.60E+37, 4.00E+48, 6.40E+73, 1.09E+89, 1.00E+200],
            [5.15E+25, 5.15E+26, 6.78E+28, 2.60E+30, 1.28E+32, 3.20E+39, 8.00E+50, 1.28E+76, 2.19E+91, 1.00E+200],
            [1.03E+28, 1.03E+29, 1.36E+31, 5.21E+32, 2.56E+34, 6.40E+41, 1.60E+53, 2.56E+78, 4.37E+93, 1.00E+200],
            [2.06E+30, 2.06E+31, 2.71E+33, 1.04E+35, 5.12E+36, 1.28E+44, 3.20E+55, 5.12E+80, 8.75E+95, 1.00E+200],
            [4.12E+32, 4.12E+33, 5.42E+35, 2.08E+37, 1.02E+39, 2.56E+46, 6.40E+57, 1.02E+83, 1.75E+98, 1.00E+200],
            [8.24E+34, 8.24E+35, 1.08E+38, 4.17E+39, 2.05E+41, 5.12E+48, 1.28E+60, 2.05E+85, 3.50E+100, 1.00E+200],
            [1.65E+37, 1.65E+38, 2.17E+40, 8.33E+41, 4.10E+43, 1.02E+51, 2.56E+62, 4.10E+87, 7.00E+102, 1.00E+200],
            [3.30E+39, 3.30E+40, 4.34E+42, 1.67E+44, 8.19E+45, 2.05E+53, 5.12E+64, 8.19E+89, 1.40E+105, 1.00E+200],
            [6.60E+41, 6.60E+42, 8.67E+44, 3.33E+46, 1.64E+48, 4.10E+55, 1.02E+67, 1.64E+92, 2.80E+107, 1.00E+200]
        ];
        for (var i = 0; i < data.length; i++) {
            var project = new Project(data[i][0], data[i][1]);
            Project.addProjectLevelRatio(project, i + 1);
            Project.addProjectAchieves(project, data[i][2], data[i][3], achievePrices[i]);
            projects.push(project);
        }
        return projects;
    };
    Project.addProjectLevelRatio = function (project, projectLevel) {
        var data = [
            //projectLowLevel, projectUpperLevel, lowerLevel: number, upperLevel: number,priceRatio: number, outputRatio: number
            [[2, 99], [1, 20, 1.05, 1]],
            [[100, 199], [1, 20, 1.05, 1]],
            [[200, 299], [1, 20, 1.03, 1]],
            [[300, 399], [1, 20, 1.03, 1]],
            [[400, 499], [1, 20, 1.03, 1]],
            [[500, 599], [1, 20, 1.05, 1.01]],
            [[600, 699], [1, 20, 1.03, 1.01]],
            [[700, 799], [1, 17, 1.02, 1.01], [18, 18, 1.04, 1.01], [19, 20, 1.05, 1.01]],
            [[800, 899], [1, 17, 1.02, 1.01], [18, 18, 1.04, 1.01], [19, 20, 1.05, 1.01]],
            [[900, 999], [1, 17, 1.02, 1.01], [18, 18, 1.04, 1.01], [19, 20, 1.05, 1.01]],
            [[1000, 1199], [1, 20, 1.03, 1.005]],
            [[1200, 1399], [1, 17, 1.02, 1.005], [18, 20, 1.03, 1.005]],
            [[1400, 1599], [1, 17, 1.02, 1.005], [18, 20, 1.03, 1.005]],
            [[1600, 1799], [1, 17, 1.02, 1.005], [18, 20, 1.03, 1.005]],
            [[1800, 1999], [1, 17, 1.02, 1.005], [18, 20, 1.03, 1.005]],
            [[2000, 2499], [1, 17, 1.01, 1.005], [10, 20, 1.03, 1.005]],
            [[2500, 2999], [1, 17, 1.02, 1.005], [18, 18, 1.04, 1.005], [19, 20, 1.05, 1.005]],
            [[3000, 3499], [1, 17, 1.01, 1.005], [18, 20, 1.03, 1.005]],
            [[3500, 3999], [1, 17, 1.01, 1.005], [18, 20, 1.03, 1.005]],
            [[4000, 4499], [1, 13, 1.01, 1.005], [14, 15, 1.02, 1.005], [16, 20, 1.03, 1.005]],
            [[4500, 4999], [1, 13, 1.01, 1.005], [14, 20, 1.03, 1.005]],
            [[5000, 5999], [1, 17, 1.01, 1.005], [18, 20, 1.03, 1.005]],
            [[6000, 6999], [1, 16, 1.01, 1.005], [17, 20, 1.03, 1.005]],
            [[7000, 7999], [1, 15, 1.02, 1.005], [16, 20, 1.03, 1.005]],
            [[8000, 8999], [1, 17, 1.03, 1.003], [18, 18, 1.04, 1.003], [19, 20, 1.05, 1.003]],
            [[9000, 9999], [1, 17, 1.03, 1.003], [18, 18, 1.04, 1.003], [19, 20, 1.05, 1.003]],
            [[10000, 99999], [1, 20, 1.01, 1.002]],
        ];
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            for (var j = 1; j < d.length; j++) {
                if (d[j][0] <= projectLevel && d[j][1] >= projectLevel) {
                    project.addLevelRatio(d[0][0], d[0][1], d[j][2], d[j][3]);
                    break;
                }
            }
        }
    };
    Project.addProjectAchieves = function (project, achieve1OutputRatio, achieve5OutputRatio, achievePrices) {
        //level: number, outputRatio: number, priceUseDiamond: number, prieUseGold: number
        project.addAchieve(50, achieve1OutputRatio, 100, achievePrices[0]);
        project.addAchieve(100, achieve1OutputRatio * 2, 100, achievePrices[1]);
        project.addAchieve(200, achieve1OutputRatio * 4, 100, achievePrices[2]);
        project.addAchieve(300, achieve1OutputRatio * 8, 100, achievePrices[3]);
        project.addAchieve(500, achieve5OutputRatio, 1000, achievePrices[4]);
        project.addAchieve(1000, achieve5OutputRatio, 2000, achievePrices[5]);
        project.addAchieve(2000, achieve5OutputRatio, 3000, achievePrices[6]);
        project.addAchieve(5000, 10000, 4000, achievePrices[7]);
        project.addAchieve(10000, 1000000, 5000, achievePrices[8]);
        project.addAchieve(100000, 10000000000, 10000, achievePrices[8]);
    };
    //根据级别、成就和道具个数计算本项目的秒产
    p.output = function (level, achieve, toolRatio) {
        //累积产量系数	判定lv所处区间。累积产量系数=上区间最终值*本区间产量系数^ (lv-上区间最终lv值）
        var cumulativeOutputRatio = 1;
        var lastLevel = 1;
        for (var i = 1; i <= this._levelRatios.length; i++) {
            var ratio = this._levelRatios[i - 1];
            if (level >= ratio.lowerLevel && level <= ratio.upperLevel) {
                cumulativeOutputRatio = ratio.outputRatioBase * Math.pow(ratio.outputRatio, (level - lastLevel));
                break;
            }
            else {
                lastLevel = ratio.upperLevel;
            }
        }
        //累积成就系数	开通的各个成就系数相乘
        var cumulativeAchieveRatio = 1;
        for (var i = 1; i <= this._achieves.length && i <= achieve; i++) {
            cumulativeAchieveRatio = cumulativeAchieveRatio * this._achieves[i - 1].outputRatio;
        }
        //项目秒产 	lv数*该项目1级秒产*累积产量系数*累积成就系数*道具升级系数
        return Math.round(level * this._outputLevelOne * cumulativeOutputRatio * cumulativeAchieveRatio * toolRatio);
    };
    //升级级别的价格
    p.priceOf = function (level) {
        //累积价格系数	判定lv所处区间。累积价格系数=上区间最终值*本区间价格系数^ (lv-上区间最终lv值）
        var cumulativePriceRatio = 1;
        var lastLevel = 1;
        for (var i = 1; i <= this._levelRatios.length; i++) {
            var ratio = this._levelRatios[i - 1];
            if (level >= ratio.lowerLevel && level <= ratio.upperLevel) {
                cumulativePriceRatio = ratio.priceRatioBase * Math.pow(ratio.priceRatio, (level - lastLevel));
                break;
            }
            else {
                lastLevel = ratio.upperLevel;
            }
        }
        return Math.round(this._priceLevelOne * cumulativePriceRatio);
    };
    //连续升级，从levelFrom到levelTo的价格
    p.price = function (level, step) {
        var p = 0;
        for (var i = level; i < level + step; i++) {
            p = p + this.priceOf(i);
        }
        return p;
    };
    p.achieve = function (a) {
        return this._achieves[a - 1];
    };
    return Project;
}());
egret.registerClass(Project,'Project');
