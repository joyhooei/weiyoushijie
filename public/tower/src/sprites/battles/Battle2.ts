//高老庄（获得hero——猪八戒）
class Battle2 extends Battle {
    //增加英雄
    protected _addHeros() {
        this._addHerosByName("Sunwukong");
    }
    
    protected _addEffects() {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    }
    
    protected _addWaves(paths:number[][][]) {        
        this._addWave(0, "Wolf", 5, 0);
        this._addWave(0, "Wolf", 5, 0);
        this._addWave(0, "Wolf", 10, 0);
        
        this._addWave(1, "Wolf", 5, 1);
        this._addWave(1, "Wolf", 10, 1);
        this._addWave(1, "Wolf", 15, 1);
        
        this._addWave(2, "Wolf", 4, 0);
        this._addWave(2, "Rhino", 2, 0);
        this._addWave(2, "Wolf", 4, 0);
        this._addWave(2, "Rhino", 2, 0);
        this._addWave(2, "Rhino", 4, 0);
        this._addWave(2, "Wolf", 5, 1);
        this._addWave(2, "Wolf", 5, 1);
        this._addWave(2, "Wolf", 5, 1);
        
        this._addWave(3, "Hogs", 3, 1);
        this._addWave(3, "Hogs", 5, 1);
        this._addWave(3, "Hogs", 6, 1);
        this._addWave(3, "Hogs", 6, 1);
        this._addWave(3, "Hogs", 8, 1);
        this._addWave(3, "Hogs", 8, 1);
        
        this._addWave(4, "Wolf", 2, 0);
        this._addWave(4, "Rhino", 2, 0);
        this._addWave(4, "Wolf", 2, 0);
        this._addWave(4, "Rhino", 2, 0);
        this._addWave(4, "Rhino", 5, 0);
        this._addWave(4, "Hogs", 5, 1);
        this._addWave(4, "Hogs", 5, 1);
        this._addWave(4, "Hogs", 5, 1);        
        this._addWave(4, "Hogs", 5, 1);        
        
        this._addWave(5, "Rhino", 2, 0);
        this._addWave(5, "Wolf", 3, 0);
        this._addWave(5, "Rhino", 2, 0);
        this._addWave(5, "Wolf", 9, 0);
        this._addWave(5, "Wolf", 1, 0);
        this._addWave(5, "Rhino", 1, 0);
        this._addWave(5, "Rhino", 2, 1);
        this._addWave(5, "Wolf", 3, 1);
        this._addWave(5, "Rhino", 2, 1);        
        this._addWave(5, "Wolf", 9, 1);        
        this._addWave(5, "Wolf", 1, 1);        
        this._addWave(5, "Rhino", 1, 1);        
        
        this._addWave(6, "Hogs", 6, 0);
        this._addWave(6, "Hogs", 6, 0);
        this._addWave(6, "Hogs", 6, 0);
        this._addWave(6, "Hogs", 6, 0);
        this._addWave(6, "Hogs", 6, 0);
        this._addWave(6, "Hogs", 6, 1);
        this._addWave(6, "Hogs", 6, 1);
        this._addWave(6, "Hogs", 6, 1);        
        this._addWave(6, "Hogs", 6, 1);        
        this._addWave(6, "Hogs", 6, 1);         
        
        this._addWave(7, "Hogs", 9, 0);
        this._addWave(7, "Hogs", 6, 0);
        this._addWave(7, "Hogs", 6, 0);
        this._addWave(7, "Hogs", 6, 0);
        this._addWave(7, "Hogs", 12, 0);
        this._addWave(7, "Rhino", 5, 1);
        this._addWave(7, "Rhino", 5, 1);
        this._addWave(7, "Wolf", 10, 1);                 
    }
}
