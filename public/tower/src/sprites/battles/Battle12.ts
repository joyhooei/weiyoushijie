//海底
class Battle12 extends Battle {
    public constructor() {
        super();
        
        this._url = "resource/art/sprites/battles/battle1.tmx";
    }
    
    protected _addBases() {
        this._addBasesByName("Base1");
    }
    
    //增加英雄
    protected _addHeros() {
        this._addHerosByName("Sunwukong");
    }
    
    protected _addEffects() {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    }
    
    protected _addStandbys() {
        let paths = this._map.getPaths();
        
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
