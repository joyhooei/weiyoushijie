class WhiteImpermanence extends Soldier {
    public constructor() {
        super();
        
        this.addClip("whiteImpermanence_east_fighting", "east-fighting")
                .addClip("whiteImpermanence_east_moving", "east-moving")
                .addClip("whiteImpermanence_guarding", "east-guarding")
                .addClip("whiteImpermanence_building", "east-building")
                .addClip("whiteImpermanence_dying", "east-dying");
    }
}
