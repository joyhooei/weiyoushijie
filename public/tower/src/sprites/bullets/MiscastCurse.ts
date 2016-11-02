class MiscastCurse extends Curse {
    public constructor() {
        super();
        
        this.addClip("miscastcurse_dying", "east-fighting");        
    }
    
    protected _hitEnemy(enemy: Enemy, force: number, ticks: number) {
        enemy.miscast(force, ticks);
    }
}
