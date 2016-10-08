//长安市郊（初始获得hero——孙悟空）
class Battle1 extends Battle {
    public constructor() {
        super();
        
        this._url = "resource/art/sprites/battles/battle1.tmx";
    }
    
    protected _addWaves(paths:number[][][]) {        
        let waves = [
            [0, "Wolf", 1, 0],
            
            [1, "Wolf", 10, 1],
            
            [2, "Hogs", 10, 0],
            
            [3, "Rhino", 10, 1],
            
            [4, "Wolf", 10, 0],
            [4, "Wolf", 10, 1],
        ];
        
        for(let i = 0; i < waves.length; i++) {
            let w = waves[i];
            
            this._waves.add(<number>w[0], <string>w[1], <number>w[2], paths[w[3]]);
        }
    }
}
