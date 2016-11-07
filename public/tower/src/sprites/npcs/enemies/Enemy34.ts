class Enemy34 extends Enemy {
    protected _skillTicks: number;

    public constructor() {
        super();
        
        this.addClip("enemy34_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy34_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy34_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy34_dying", "east-dying")
            .addClip("enemy34_east_fighting", "east-fighting");
    }
    
    protected _hitOpponents() {
        let s = this.firstSoldier();
    	if (s) {
            this._skillTicks --;
            if (this._skillTicks <= 0) {
                if (s.damage(this.getForce() * 3)) {
                    this.rmvSoldier(s);
                }
                this._skillTicks ++;
            } else {
                if (s.hitBy(this)) {
                    this.rmvSoldier(s);
                }
            }
    	} else {
    		this._moveAgain();
    	}
    }    
}
