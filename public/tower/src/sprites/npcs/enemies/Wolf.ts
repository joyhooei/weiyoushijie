class Wolf extends Enemy {
    public constructor() {
        super();
        
        this.addClip("wolf_east_moving", "east-moving", 8)
            .addClip("wolf_dying", "dying", 8)
            .addClip("wolf_east_moving", "guarding", 8)
            .addClip("wolf_east_fighting", "east-fighting", 8);
    }
}
