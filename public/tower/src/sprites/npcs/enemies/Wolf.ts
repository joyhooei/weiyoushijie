class Wolf extends Enemy {
    public constructor() {
        super();
        
        this.addClip("wolf_dying", "dying")
            .addClip("wolf_east_moving", ["east-moving", "south-moving", "guarding"])
            .addClip("wolf_east_fighting", ["east-fighting", "south-fighting","north-fighting"]);
    }
}
