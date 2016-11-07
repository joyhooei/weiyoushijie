class Enemy7 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy7_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy7_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy7_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy7_dying", "east-dying")
            .addClip("enemy7_east_fighting", "east-fighting");
    }
}
