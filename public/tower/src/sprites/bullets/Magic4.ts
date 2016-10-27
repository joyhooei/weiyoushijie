class Magic4 extends Magic {
   protected _hitRadius: number;

    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllClips("magic4_fighting", "fighting")
            .addAllClips("magic4_building", "building");
    }
     
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
    }
    
    protected _hitTarget() {
        let enemies = application.battle.findEnemies(this.getCenterX(), this.getBottomY(), this._hitRadius, [-1, 0, 1]);
        for (let i = 0; i < enemies.length; i++) {
               enemies[i].shootBy(this);
        }
    }
}
