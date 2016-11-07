class Enemy16 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy16_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy16_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy16_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy16_dying", "east-dying")
            .addClip("enemy16_east_fighting", "east-fighting");
    }
    
    public update(): boolean {
        if (this.active()) {
            let soldiers = application.battle.findSoldiers(this.getCenterX(), this.getCenterY(), 80);
            for(let i = 0; i < soldiers.length; i++) {
                if (soldiers[i].dead()) {
                     this.addMaxHp(50);
                }
            }
        }
        
        return super.update();
    }    
}
