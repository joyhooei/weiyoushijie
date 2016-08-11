class Battle1 extends Battle {
    public constructor() {
        super();
        
        this._url = "level1.tmx";
    }

    //增加英雄
    protected _addHeros() {
        let heros = this._map.getHeros();
        for(let i = 0; i < heros.length; i ++) {
            this._addHero(heros[i][0], heros[i][1], <MonkeyKing>application.pool.get("MonkeyKing"));
    	}
    }
    
    protected _addStandbys() {
        let paths = this._map.getPaths();
        
        let waves = [
            [0, 0, "Enemy", 10],
            
            [1, 1, "Enemy", 10],
            
            [2, 0, "Enemy", 10],
            [2, 1, "Enemy", 10],
        ];
        
        for(let i = 0; i < waves.length; i++) {
            let wave = waves[i];
            this._addWaveStandbys(wave[0], paths[wave[1]], wave[2], wave[3]);
        }
    }
}
