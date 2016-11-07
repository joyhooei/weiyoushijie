class Enemy31 extends ShootEnemy {
    public constructor() {
        super();
        
        this.addClip("enemy31_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy31_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy31_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy31_dying", "east-dying")
            .addClip("enemy31_east_fighting", "east-fighting");
    }
    
    protected _hitOpponents() {
        let s = this.firstSoldier();
    	if (s) {
            if (Math.random() <= 0.1) {
                if (s.getParentClaz() == "Hero") {
                    if (s.damage(100)) {
                        this.rmvSoldier(s);
                    }
                } else {
                    s.kill();
                    this.rmvSoldier(s);
                }
            } else {
                if (s.hitBy(this)) {
                    this.rmvSoldier(s);
                }
            }
    	} else {
    		this._moveAgain();
    	}
    }
    
    public kill() {
        super.kill();
        
        let soldiers = application.battle.findSoldiers(this.getCenterX(), this.getCenterY(), 80);
        for(let i = 0; i < soldiers; i++) {
            soldiers[i].damage(50);
        }
    }
}
