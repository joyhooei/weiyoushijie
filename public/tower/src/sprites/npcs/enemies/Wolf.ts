class Wolf extends Enemy {
    public constructor() {
        super();
        
        this.addClip("wolf_dying", "east-dying")
            .addClip("wolf_east_moving", ["east-moving", "east-guarding"])
            .addClip("wolf_north_moving", ["north-moving", "north-guarding"])
            .addClip("wolf_south_moving", ["south-moving", "south-guarding"])
            .addClip("wolf_east_fighting", "east-fighting");
    }
}
