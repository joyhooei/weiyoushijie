class Battle1 extends Battle {
    public constructor() {
        super();
        
        this._url = "level1.tmx";
    }

    //增加英雄
    protected _addHeros() {
        let pos = this._map.getHeros();
        for(let i = 0; i < pos.length; i++) {
            let hero = <MonkeyKing>application.pool.get("MonkeyKing");
            hero.x = pos[i][0];
            hero.y = pos[i][1];
            this.addHero(hero);
        }
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
            let w = waves[i];
            
            this._addWaveStandbys(<number>w[0], <string>w[1], <number>w[2], paths[w[3]]);
        }
    }
}
