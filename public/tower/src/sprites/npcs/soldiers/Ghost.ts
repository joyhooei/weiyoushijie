class Ghost extends Soldier {
    public constructor() {
        super();
        
        this.addClip("ghost_east_fighting", "east-fighting")
                .addClip("ghost_east_moving", "east-moving")
                .addClip("ghost_building", "east-building")
                .addClip("ghost_guarding", "east-guarding")
                .addClip("ghost_dying", "east-dying");
    }
}
