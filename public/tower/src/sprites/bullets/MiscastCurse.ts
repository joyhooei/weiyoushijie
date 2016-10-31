class MiscastCurse extends Curse {
    public constructor() {
        super();
        
        this.addClip("miscastcurse_dying");        
    }
    
    protected _hitEnemy(enemy: Enemy, force: number, ticks: number) {
        enemy.miscast(force, ticks);
    }
}
