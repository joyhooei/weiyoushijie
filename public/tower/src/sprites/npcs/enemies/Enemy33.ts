class Enemy33 extends Enemy {
    protected _flashTicks: number;

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
        
        this._flashTicks = application.frameRate;
    }
    
    protected _moving() {
        this._flashTicks--;
        if (this._flashTicks <= 0) {
            for(let i = 0; i < 10; i++) {
                if (this.active()) {
                    super._moving();
                }
            }
            
            this._flashTicks = 5 * application.frameRate;
        }
    }
}
