class Freeze extends Bullet {
    public constructor() {
        super();
        
        this.addAllClips("freeze_dying", "fighting");        
    }
    
    protected _hitTarget() {
        let enemies = application.battle.getEnemies();
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].frozen();
        }
    }
}
