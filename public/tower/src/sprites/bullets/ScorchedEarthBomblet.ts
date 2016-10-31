class ScorchedEarthBomblet extends Bomb {
    public constructor() {
        super();
        
        this.addClip("scorchedearthbomblet_fighting");
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._hitRadius, [0, 1]);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].burn(this.getForce(), 4 * application.frameRate);
        }
    }
}
