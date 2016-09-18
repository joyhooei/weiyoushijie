class Warrior extends Soldier {
    public constructor() {
        super();
        
        this.addClip("warrior_east_fighting", "east-fighting").addClip("warrior_east_fighting", "moving").addClip("warrior_east_fighting", "guarding")
                .addClip("warrior_dying", "dying");
    }
}
