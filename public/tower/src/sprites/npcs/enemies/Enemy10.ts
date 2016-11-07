class Enemy10 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy10_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy10_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy10_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy10_dying", "east-dying")
            .addClip("enemy10_east_fighting", "east-fighting");
    }
}
