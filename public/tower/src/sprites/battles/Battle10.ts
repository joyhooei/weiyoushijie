//盘丝洞
class Battle10 extends Battle {
    //增加英雄
    protected _addHeros() {
        this._addHerosByName("Sunwukong");
    }
    
    protected _addEffects() {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    }
    
    protected _addWaves() {        
    }
}
