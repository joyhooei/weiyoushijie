class Utility {
    public static units = [
        'k', 'm', 'b', 't', 
        'a', 'A', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', '!', 'j', 'J', 'l', 'L', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
        'aa', 'AA', 'cc', 'CC', 'dd', 'DD', 'ee', 'EE', 'ff', 'FF', 'gg', 'GG', 'hh', 'HH', 'ii', '!!', 'jj', 'JJ', 'll', 'LL', 'nn', 'NN', 'oo', 'OO', 'pp', 'PP', 'qq', 'QQ', 'rr', 'RR', 'ss', 'SS', 'uu', 'UU', 'vv', 'VV', 'ww', 'WW', 'xx', 'XX', 'yy', 'YY', 'zz', 'ZZ',
    ];
    
    public static log10(d:number):number {
        let result:number = 0;
        
        //可能出现9.9999999e+25的情况
        while(d >= 9) {
            result += 1;
            d = d / 10;
        }
        
        return result;
    }
    
    public static format(d:number): string {
		try {
			if (d <= 99999) {
				return new Number(d).toFixed();
			}
        
			let unit:string  = "";		
			for (var i = 0; i < Utility.units.length; i++) {
				if (d < 10) {
                    return new Number(d).toFixed(2) + unit;
				} else if (d < 100) {
                    return new Number(d).toFixed(1) + unit;
				} else if (d < 1000) {
                    return new Number(d).toFixed() + unit;
				} else {
					unit = Utility.units[i];
					d = d / 1000;
				}
			}
			
            return new Number(d).toFixed() + unit;
		} catch (error) {
            console.error("format " + d + " error " + error.message);
			
			return "0";
		}
    }
    
	public static delay(cb: Function, miniseconds: number) {
		var timer: egret.Timer = new egret.Timer(miniseconds, 1);
		timer.addEventListener(egret.TimerEvent.TIMER,function(event: egret.TimerEvent) {
			cb();
		},this);
		timer.start();	
	}
	
	public static takeOverConsole(logger:any){
    	var console = window.console;
    	if (!console) {
    		return;
    	}

    	var methods = ['log', 'warn', 'error'];
    	for (var i = 0; i < methods.length; i++) {
        	Utility.intercept(methods[i], logger);
    	}
	}
	
	public static intercept(method, logger){
    	var original = console[method];
    	console[method] = function(){
            logger[method](arguments);
            
            if (original.apply){
                // Do this for normal browsers
                original.apply(console, arguments);
            }else{
                // Do this for IE
                var message = Array.prototype.slice.apply(arguments).join(' ');
                original(message);
            }
    	}
	}	
}
        
