class Enemy9 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy9_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy9_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy9_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy9_dying", "east-dying")
            .addClip("enemy9_east_fighting", "east-fighting");
    }
    
    protected _hitOpponents() {
        super._hitOpponents();
        
        let s = this.firstSoldier();
    	if (s) {
            s.black(5, 2 * application.frameRate, false);
    	}
    }    
}
