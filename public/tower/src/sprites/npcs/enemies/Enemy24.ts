class Enemy24 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy24_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy24_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy24_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy24_dying", "east-dying")
            .addClip("enemy24_east_fighting", "east-fighting");
    }
}
