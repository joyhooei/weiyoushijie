class Enemy13 extends ShootEnemy {
    protected _summonTicks: number;

    public constructor() {
        super();
        
        this.addClip("enemy13_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy13_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy13_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy13_dying", "east-dying")
            .addClip("enemy13_east_fighting", "east-fighting");
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._summonTicks = this._get(properties, "summonTicks", 3 * application.frameRate);
    }
    
    protected _moving() {
        super._moving();
        
        this._ticks++;
        if (this._ticks % this._summonTicks == 0) {
            let pos = this._ahead(10);
            this._born("Enemy7", pos[0], pos[1]);
        }
    }    
}
