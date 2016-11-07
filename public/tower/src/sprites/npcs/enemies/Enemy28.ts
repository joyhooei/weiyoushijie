class Enemy28 extends SummonEnemy {
    protected _summonTicks: number;

    public constructor() {
        super();
        
        this.addClip("enemy28_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy28_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy28_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy28_dying", "east-dying")
            .addClip("enemy28_east_fighting", "east-fighting");
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._summonTicks = this._get(properties, "summonTicks", 5 * application.frameRate);
    }
    
    protected _moving() {
        super._moving();
        
        this._ticks++;
        if (this._ticks % this._summonTicks == 0) {
            let pos = this._ahead(1);
            this._born("Enemy27", pos[0], pos[1]);
        }
    } 
}
