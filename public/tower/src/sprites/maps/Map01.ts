class Map01 extends Map {
    public constructor() {
        super();
    }
    
    //增加塔基放置点
    protected addBases() {
        let x = [100];
        let y = [100];
        
        for(let i = 0; i < x.length; i++) {
            this._addBase(x[i], y[i], new Base());
        }
    }

    //增加英雄
    protected addHero() {
        this._setHero(100, 200, new Hero());
    }
    
    //增加敌人
    protected addStandbys() {
        let pah = [];
        this._addStandbys(new Enemy(), path, 10);
    }
}
