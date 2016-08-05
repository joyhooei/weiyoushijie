class Battle1 extends Battle {
    public constructor() {
        super();
    }
    
    //增加塔基放置点
    public addBases() {
        let x = [100];
        let y = [100];
        
        for(let i = 0; i < x.length; i++) {
            let entity = application.pool.get("Base");
            this._addBase(x[i], y[i], <Base>entity);
        }
    }

    //增加英雄
    public addHero() {
        this._setHero(100,200,<Hero>application.pool.get("Hero"));
    }
    
    //增加敌人
    public launch(wave:number) {
        let enemy = <Enemy>application.pool.get("Enemy");
        this.addEnemies(-10, 200, [enemy]);
    }
}
