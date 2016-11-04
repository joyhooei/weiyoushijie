class Enemy9 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    
    protected _hitOpponents() {
        super._hitOpponents();
        
        let s = this.firstSoldier();
    	if (s) {
            s.black(5, 2 * application.frameRate, false);
    	}
    }    
}
