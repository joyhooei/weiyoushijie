class Utility {
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
			for (var i = 0; i < application.units.length; i++) {
				if (d < 10) {
                    return new Number(d).toFixed(2) + unit;
				} else if (d < 100) {
                    return new Number(d).toFixed(1) + unit;
				} else if (d < 1000) {
                    return new Number(d).toFixed() + unit;
				} else {
					unit = application.units[i];
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
}
        
