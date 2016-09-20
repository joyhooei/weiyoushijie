class Hogs extends Enemy {
    public constructor() {
        super();
        
        this.addClip("hogs_east_moving", "east-moving", 8)
            .addClip("hogs_dying", "dying", 8)
            .addClip("hogs_east_moving", "guarding", 8)
            .addClip("hogs_east_fighting", "east-fighting", 8);
    }
}
