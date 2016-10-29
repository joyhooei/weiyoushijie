class Freeze extends Bullet {
    public constructor() {
        super();
        
        this.addClip("freeze_dying", "east-fighting");        
    }
    
    protected _hitTarget() {
        let enemies = application.battle.getEnemies();
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].frozen(this.getForce(), application.frameRate << 2);
        }
    }
}
