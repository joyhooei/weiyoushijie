class BlackWater extends Curse {
    public constructor() {
        super();
        
        this.addClip("blackwater_fighting");
    }
    
    protected _hitEnemy(enemy: Enemy, force: number, ticks: number) {
        enemy.black(force, ticks);
    }
}
