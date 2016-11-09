//车迟国
class Battle6 extends Battle {
    protected _addEffects() {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    }
    
    protected _addWaves() {        
    }
}
