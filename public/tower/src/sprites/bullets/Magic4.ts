class Magic4 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllClips("magic4_fighting", "fighting")
            .addAllClips("magic4_building", "building");
    }
    
    protected _act():boolean {
        if (this._state == EntityState.fighting) {
            let enemies = application.battle.getEnemies();
            for (let i = 0; i < enemies.length; i++) {
                enemies[i].shootBy(this);
            }
        }

        return super._act();
    }
}
