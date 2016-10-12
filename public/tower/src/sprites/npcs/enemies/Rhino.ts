class Rhino extends Enemy {
    public constructor() {
        super();
        
        this.addClip("rhino_east_moving", ["east-moving", "south-moving", "north-moving", "east-guarding", "south-guarding", "north-guarding"])
            .addAllClips("rhino_dying", "dying")
            .addClip("rhino_east_fighting", ["east-fighting", "south-fighting", "north-fighting"]);
    }
}
