class Enemy23 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy23_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy23_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy23_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy23_dying", "east-dying")
            .addClip("enemy23_east_fighting", "east-fighting");
    }
    
    //攻击接触到的士兵
    protected _hitOpponents() {
        let soldiers = application.battle.findSoldiers(this.getCenterX(), this.getCenterY(), 50);
        for(let i = 0; i < soldiers.length; i++) {
            let s = soldiers[i];
            if (s.hitBy(this)) {
                this.rmvSoldier(s);
            }
        }
    }    
}
