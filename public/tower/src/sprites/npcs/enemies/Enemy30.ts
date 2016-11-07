class Enemy30 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy30_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy30_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy30_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy30_dying", "east-dying")
            .addClip("enemy30_east_fighting", "east-fighting");
    }

    protected _hitOpponents() {
        let s = this.firstSoldier();
    	if (s) {
	        if (s.hitBy(this)) {
	            this.rmvSoldier(s);
	        }

            this._hp.setHp(this._hp.getHp() + this.getForce());
    	} else {
    		this._moveAgain();
    	}
    }
}
