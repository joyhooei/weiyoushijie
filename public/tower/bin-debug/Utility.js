var Utility = (function () {
    function Utility() {
    }
    var d = __define,c=Utility,p=c.prototype;
    Utility.log10 = function (d) {
        var result = 0;
        //可能出现9.9999999e+25的情况
        while (d >= 9) {
            result += 1;
            d = d / 10;
        }
        return result;
    };
    Utility.format = function (d) {
        try {
            if (d <= 99999) {
                return new Number(d).toFixed();
            }
            var unit = "";
            for (var i = 0; i < Utility.units.length; i++) {
                if (d < 10) {
                    return new Number(d).toFixed(2) + unit;
                }
                else if (d < 100) {
                    return new Number(d).toFixed(1) + unit;
                }
                else if (d < 1000) {
                    return new Number(d).toFixed() + unit;
                }
                else {
                    unit = Utility.units[i];
                    d = d / 1000;
                }
            }
            return new Number(d).toFixed() + unit;
        }
        catch (error) {
            console.error("format " + d + " error " + error.message);
            return "0";
        }
    };
    Utility.delay = function (cb, miniseconds) {
        var timer = new egret.Timer(miniseconds, 1);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            cb();
        }, this);
        timer.start();
    };
    Utility.takeOverConsole = function (logger) {
        var console = window.console;
        if (!console) {
            return;
        }
        var methods = ['log', 'warn', 'error'];
        for (var i = 0; i < methods.length; i++) {
            Utility.intercept(methods[i], logger);
        }
    };
    Utility.intercept = function (method, logger) {
        var original = console[method];
        console[method] = function () {
            try {
                var message = Array.prototype.slice.apply(arguments).join(' ');
                if (method === 'log') {
                    logger.info(message);
                }
                else if (method == 'warn') {
                    logger.warn(message);
                }
                else {
                    logger.error(message);
                }
                if (original.apply) {
                    // Do this for normal browsers
                    original.apply(console, arguments);
                }
                else {
                    // Do this for IE
                    original(message);
                }
            }
            catch (error) {
            }
        };
    };
    Utility.units = [
        'k', 'm', 'b', 't',
        'a', 'A', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', '!', 'j', 'J', 'l', 'L', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
        'aa', 'AA', 'cc', 'CC', 'dd', 'DD', 'ee', 'EE', 'ff', 'FF', 'gg', 'GG', 'hh', 'HH', 'ii', '!!', 'jj', 'JJ', 'll', 'LL', 'nn', 'NN', 'oo', 'OO', 'pp', 'PP', 'qq', 'QQ', 'rr', 'RR', 'ss', 'SS', 'uu', 'UU', 'vv', 'VV', 'ww', 'WW', 'xx', 'XX', 'yy', 'YY', 'zz', 'ZZ',
    ];
    return Utility;
}());
egret.registerClass(Utility,'Utility');
