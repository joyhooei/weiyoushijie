class Soldier2 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier2_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
                .addClip("soldier2_east_moving", ["east-moving", "north-moving", "south-moving"])
                .addAllClips("soldier2_guarding", "guarding")
                .addAllClips("soldier2_dying", "dying");
    }
}
