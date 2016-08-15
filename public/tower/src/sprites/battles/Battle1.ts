class Battle1 extends Battle {
    public constructor() {
        super();
        
        this._addHero(<Hero>application.pool.get("MonkeyKing"));
        
        this._addWaveEnemy(0, 0, 0, "Enemy", {});
        this._addWaveEnemy(0, 0, 0, "Enemy", {});
        this._addWaveEnemy(0, 0, 0, "Enemy", {});
        this._addWaveEnemy(0, 0, 0, "Enemy", {});
    }
}
