class Freeze extends Bullet {
    public constructor() {
        super();
        
        this.addClip("freeze_dying");        
    }
    
    protected _hitEnemy(enemy: Enemy, force: number, ticks: number) {
        enemy.frozen(force, ticks);
    }
}
