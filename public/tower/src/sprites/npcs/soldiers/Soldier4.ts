class Soldier4 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier4_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
                .addClip("soldier4_east_moving", ["east-moving", "north-moving", "south-moving"])
                .addAllClips("soldier4_guarding", "guarding")
                .addAllClips("soldier4_dying", "dying");
    }
}
