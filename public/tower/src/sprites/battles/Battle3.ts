//黄风怪
class Battle3 extends Battle {
    //增加英雄
    protected _addHeros() {
        this._addHerosByName("Sunwukong");
    }

    //增加塔基
    protected _addBases() {
        this._addBasesByName("Base3");        
    }

    protected _addEffects() {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    }
    
    protected _addWaves() {
        this._addWave(0, "Enemy4", 1, 0);
        this._addWave(1, "Enemy4", 1, 1);
    }
}
