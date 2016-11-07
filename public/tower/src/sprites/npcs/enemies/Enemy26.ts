class Enemy26 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy26_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy26_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy26_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy26_dying", "east-dying")
            .addClip("enemy26_east_fighting", "east-fighting");
    }
}
