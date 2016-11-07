class Enemy15 extends Enemy {
    protected _summonTicks: number;

    public constructor() {
        super();
        
        this.addClip("enemy15_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy15_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy15_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy15_dying", "east-dying")
            .addClip("enemy15_east_fighting", "east-fighting");
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._summonTicks = this._get(properties, "summonTicks", 5 * application.frameRate);
    }
    
    protected _moving() {
        super._moving();
        
        this._ticks++;
        if (this._ticks % this._summonTicks) {
            let pos = this._ahead(2);
            this._born("Enemy36", pos[0] + 5, pos[1] + 5);
            this._born("Enemy36", pos[0], pos[1]);
            this._born("Enemy36", pos[0] - 5, pos[1] - 5);
        }
    }    
}
