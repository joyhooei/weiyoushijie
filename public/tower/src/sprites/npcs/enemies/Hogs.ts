class Hogs extends Enemy {
    public constructor() {
        super();
        
        this.addClip("hogs_east_moving", "east-moving")
                    .addClip("hogs_dying", "dying")
                    .addClip("hogs_east_moving", "guarding")
                    .addClip("hogs_east_fighting", "east-fighting");
    }
}
