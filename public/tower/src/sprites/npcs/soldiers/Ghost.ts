class Ghost extends Soldier {
    public constructor() {
        super();
        
        this.addClip("ghost_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
                .addClip("ghost_east_moving", ["east-moving", "north-moving", "south-moving"])
                .addAllClips("ghost_building", "building")
                .addAllClips("ghost_guarding", "guarding")
                .addAllClips("ghost_dying", "dying");
    }
}
