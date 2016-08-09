class Battle1 extends Battle {
    public constructor() {
        super();
    }
    
    //增加塔基放置点
    public addBases() {
        let bases = this._map.getBasePositions();
        
        for(let i = 0; i < bases.length; i++) {
            let entity = application.pool.get("Base");
            this._addBase(bases[i][0], bases[i][1], <Base>entity);
        }
    }

    //增加英雄
    public addHero() {
        let hero = this._map.getBaseGuardPosition();
        this._setHero(hero[0],hero[1],<Hero>application.pool.get("Hero"));
    }
    
    //增加敌人
    public launch(wave:number) {
        let enemy = <Enemy>application.pool.get("Enemy");
        this.addEnemies(-10, 200, [enemy]);
    }
}
