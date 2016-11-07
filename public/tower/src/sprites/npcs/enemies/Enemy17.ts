class Enemy17 extends ShootEnemy {
    public constructor() {
        super();
        
        this.addClip("enemy17_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy17_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy17_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy17_dying", "east-dying")
            .addClip("enemy17_east_fighting", "east-fighting");
    }

    protected _hitOpponents() {
        super._hitOpponents();
        
        let s = this.firstSoldier();
    	if (s) {
            s.black(5, 2 * application.frameRate, false);
    	}
    }    
}
