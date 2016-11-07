class Enemy22 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy22_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy22_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy22_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy22_dying", "east-dying")
            .addClip("enemy22_east_fighting", "east-fighting");
    }
}
