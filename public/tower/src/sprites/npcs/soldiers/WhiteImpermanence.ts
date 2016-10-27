class WhiteImpermanence extends Soldier {
    public constructor() {
        super();
        
        this.addClip("whiteImpermanence_east_fighting", ["east-fighting", "north-fighting", "south-fighting"])
                .addClip("whiteImpermanence_east_moving", ["east-moving", "north-moving", "south-moving"])
                .addAllClips("whiteImpermanence_guarding", "guarding")
                .addAllClips("whiteImpermanence_building", "building")
                .addAllClips("whiteImpermanence_dying", "dying");
    }
}
