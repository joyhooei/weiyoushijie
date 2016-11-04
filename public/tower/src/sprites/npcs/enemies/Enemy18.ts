class Enemy18 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    
    //攻击接触到的士兵
    protected _hitOpponents() {
        let soldiers = application.battle.findSoldiers(this.getCenterX(), this.getCenterY(), 50, [0]);
        for(let i = 0; i < soldiers; i++) {
            let s = soldiers[i];
            if (s.hitBy(this)) {
                this.rmvSoldier(s);
            }
        }
    }    
}
