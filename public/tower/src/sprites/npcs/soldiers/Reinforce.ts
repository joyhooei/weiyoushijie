class Reinforce extends Soldier {
    public constructor() {
        super();
        
        this.addClip("reinforce_east_fighting", "east-fighting")
                .addClip("reinforce_east_moving", "east-moving")
                .addClip("reinforce_east_moving", "east-guarding")
                .addClip("reinforce_dying", "dying");
    }
}
