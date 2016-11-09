//海底
class Battle12 extends Battle {
    public constructor() {
        super();

        this._width  = 800;
        this._height = 640; 
    }
    
    protected _addEffects() {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    }
    
    protected _addWaves() {        
        this._addWave(0, "Wolf", 5, 0);   
    }
}
