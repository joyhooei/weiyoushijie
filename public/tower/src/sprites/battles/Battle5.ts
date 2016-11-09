//流沙河（获得hero——沙僧）
class Battle5 extends Battle {
    private _lawn: Effect;

    //增加塔基
    protected _addBases() {
        this._addBasesByName("Base5");        
    }

    protected _addEffects() {
        this._addEffectByName("Frog", 200, 200, EntityDirection.west);
        this._lawn = this._addEffectByName("Lawn", 200, 200, EntityDirection.west);
    }
    
    protected _addWaves() {
        this._addWave(0, "Enemy4", 1, 0);
        this._addWave(1, "Enemy4", 1, 1);
    }

    protected _addBoss(){
        let self = this;

        let boat = <Boat>application.pool.get("Boat");
        boat.x = 240;
        boat.y = 400;
        boat.setCallback(function(entity:Entity){
            self._addBossByName(self._boss, 0);

            self._lawn.kill();
        });

        self.addEntity(boat);
    }
}
