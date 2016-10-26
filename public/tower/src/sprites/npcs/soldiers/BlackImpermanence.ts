class BlackImpermanence extends Soldier {
    public constructor() {
        super();
        
        this.addClip("blackImpermanence_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
                .addClip("blackImpermanence_east_moving", ["east-moving", "north-moving", "south-moving"])
                .addAllClips("blackImpermanence_guarding", "guarding")
                .addAllClips("blackImpermanence_dying", "dying");
    }
}
