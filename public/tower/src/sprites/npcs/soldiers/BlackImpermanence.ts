class BlackImpermanence extends Soldier {
    public constructor() {
        super();
        
        this.addClip("blackImpermanence_east_fighting", "east-fighting")
                .addClip("blackImpermanence_east_moving", "east-moving")
                .addClip("blackImpermanence_guarding", "east-guarding")
                .addClip("blackImpermanence_building", "east-building")
                .addClip("blackImpermanence_dying", "east-dying");
    }
}
