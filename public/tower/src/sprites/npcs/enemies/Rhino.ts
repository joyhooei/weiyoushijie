class Rhino extends Enemy {
    public constructor() {
        super();
        
        this.addClip("rhino_east_moving", "east-moving", 8)
            .addClip("rhino_dying", "dying", 8)
            .addClip("rhino_east_moving", "guarding", 8)
            .addClip("rhino_east_fighting", "east-fighting", 8);
    }
}
