class Soldier3 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier3_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
                .addClip("soldier3_east_moving", ["east-moving", "north-moving", "south-moving"])
                .addAllClips("soldier3_guarding", "guarding")
                .addAllClips("soldier3_dying", "dying");
    }
}
