class Rhino extends Enemy {
    public constructor() {
        super();
        
        this.addClip("rhino_east_moving", ["east-moving"])
            .addClip("rhino_south_moving", ["south-moving"])
            .addClip("rhino_north_moving", ["north-moving"])
            .addAllClips("rhino_dying", "dying")
            .addAllClips("rhino_guarding", "guarding")
            .addClip("rhino_east_fighting", ["east-fighting", "south-fighting", "north-fighting"]);
    }
}
