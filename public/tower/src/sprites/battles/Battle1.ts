class Battle1 extends Battle {
    public constructor() {
        super();
        
        this._url = "resource/art/sprites/battles/level2.tmx";
    }

    //增加英雄
    protected _addHeros() {
        let pos = this._map.getExits();
        for(let i = 0; i < pos.length; i++) {
            let guardX = Math.min(Math.max(pos[i][0], 50), 750);
            let guardY = Math.min(Math.max(pos[i][1], 50), 430);
            let hero = <MonkeyKing>application.pool.get("MonkeyKing", {guardX: guardX, guardY: guardY});
            hero.x = pos[i][0];
            hero.y = pos[i][1];
            this.addHero(hero);

            hero.moveTo(guardX,guardY);
        }
    }
    
    protected _addStandbys() {
        let paths = this._map.getPaths();
        
        let waves = [
            [0, "Enemy", 10, 0],
            
            [1, "Enemy", 10, 1],
            
            [2, "Enemy", 10, 0],
            [2, "Enemy", 10, 1],
        ];
        
        for(let i = 0; i < waves.length; i++) {
            let w = waves[i];
            
            this._waves.add(<number>w[0], <string>w[1], <number>w[2], paths[w[3]]);
        }
    }
}
