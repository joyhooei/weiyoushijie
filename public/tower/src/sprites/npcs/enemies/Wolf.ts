class Wolf extends Enemy {
    public constructor() {
        super();
        
        this.addAllClips("wolf_dying", "dying")
            .addClip("wolf_east_moving", ["east-moving", "south-moving", "north-moving", "east-guarding", "south-guarding", "north-guarding"])
            .addClip("wolf_east_fighting", ["east-fighting", "south-fighting","north-fighting"]);
    }
}
