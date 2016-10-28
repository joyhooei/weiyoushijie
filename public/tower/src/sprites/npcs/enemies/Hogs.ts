class Hogs extends Enemy {
    public constructor() {
        super();
        
        this.addClip("hogs_east_moving", "east-moving")
            .addClip("hogs_north_moving", "north-moving")
            .addClip("hogs_east_guarding", "east-guarding")
            .addClip("hogs_dying", "east-dying")
            .addClip("hogs_east_fighting", "east-fighting");
    }
}
