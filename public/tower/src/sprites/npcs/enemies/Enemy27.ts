class Enemy27 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy27_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy27_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy27_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy27_dying", "east-dying")
            .addClip("enemy27_east_fighting", "east-fighting");
    }
}
