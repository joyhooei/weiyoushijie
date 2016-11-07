class Enemy35 extends Enemy {
    protected _summonTicks: number;

    public constructor() {
        super();
        
        this.addClip("enemy33_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy33_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy33_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy33_dying", "east-dying")
            .addClip("enemy33_east_fighting", "east-fighting");
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._summonTicks = this._get(properties, "summonTicks", 5 * application.frameRate);
    }
    
    protected _moving() {
        super._moving();
        
        this._ticks++;
        if (this._ticks % this._summonTicks == 0) {
            let pos = this._ahead(10);
            this._born("Enemy29", pos[0], pos[1]);
            this._born("Enemy32", pos[0], pos[1]);
            this._born("Enemy33", pos[0], pos[1]);
        }
    }      
}
