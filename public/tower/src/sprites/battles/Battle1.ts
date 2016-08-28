class Battle1 extends Battle {
    public constructor() {
        super();
        
        this._url = "resource/art/sprites/battles/level2.tmx";
    }
    
    protected _addBases() {
        this._addBasesByName("Base1");
    }
    
    //增加英雄
    protected _addHeros() {
        this._addHerosByName("MonkeyKing");
    }
    
    protected _addStandbys() {
        let paths = this._map.getPaths();
        
        let waves = [
            [0, "Enemy1", 10, 0],
            
            [1, "Enemy1", 10, 1],
            
            [2, "Enemy1", 10, 0],
            [2, "Enemy1", 10, 1],
        ];
        
        for(let i = 0; i < waves.length; i++) {
            let w = waves[i];
            
            this._waves.add(<number>w[0], <string>w[1], <number>w[2], paths[w[3]]);
        }
    }
}
