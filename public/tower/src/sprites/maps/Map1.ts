class Map1 extends Map {
    public constructor() {
        super();
    }
    
    //增加塔基放置点
    protected addBases() {
        let x = [100];
        let y = [100];
        
        for(let i = 0; i < x.length; i++) {
            this._addBase(x[i], y[i], application.pool.get("Base"));
        }
    }

    //增加英雄
    protected addHero() {
        this._setHero(100, 200, application.pool.get("Hero"));
    }
    
    //增加敌人
    protected launch(wave:number) {
        let enemy = application.pool.get("Enemy");
        this.addEnemies(-10, 200, [enemy]);
    }
}
