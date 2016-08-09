class Battle1 extends Battle {
    public constructor() {
        super();
        
        this._hero = <Hero>application.pool.get("Hero");
        
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
    }
}
