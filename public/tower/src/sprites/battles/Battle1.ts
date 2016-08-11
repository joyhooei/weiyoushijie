class Battle1 extends Battle {
    public constructor() {
        super();

        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
    }
    
    //增加英雄
    protected _addHeros() {
        let heros = this._map.getHeros();
        for(let i = 0; i < heros.length; i ++) {
            this._addHero(heros[i][0], heros[i][1], <MonkeyKing>application.pool.get("MonkeyKing"));
    	}
    }
}
