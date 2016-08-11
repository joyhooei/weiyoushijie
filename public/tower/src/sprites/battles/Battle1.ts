class Battle1 extends Battle {
    public constructor() {
        super();
        
        this._url = "level1.tmx";
    }

    //增加英雄
    protected _addHeros() {
        let heros = this._map.getHeros();
        this._addHero(heros[0][0], heros[0][1], <MonkeyKing>application.pool.get("MonkeyKing"));
    }
    
    protected _addStandbys() {
        let paths = this._map.getPaths();
        
        let waves = [
            [0, "Enemy", 10, 0],
            
            [1, "Enemy", 10, 10],
            
            [2, "Enemy", 10, 0],
            [2, "Enemy", 10, 1],
        ];
        
        for(let i = 0; i < waves.length; i++) {
            let wave = waves[i];
            
            this._addWaveStandbys(wave[0], wave[1], wave[2], paths[wave[3]]);
        }
    }
}
