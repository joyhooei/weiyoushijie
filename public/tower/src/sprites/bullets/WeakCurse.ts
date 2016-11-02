class WeakCurse extends Curse {
    public constructor() {
        super();
        
        this.addClip("weakcurse_dying", "east-fighting");        
    }
    
    protected _hitEnemy(enemy: Enemy, force: number, ticks: number) {
        enemy.weak(force, ticks);
    }
}
