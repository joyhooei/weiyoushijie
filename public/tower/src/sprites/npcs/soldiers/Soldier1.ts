class Soldier1 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier1_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
                .addClip("soldier1_east_moving", ["east-moving", "north-moving", "south-moving"])
                .addAllClips("soldier1_guarding", "guarding")
                .addAllClips("soldier1_dying", "dying");
    }
}
