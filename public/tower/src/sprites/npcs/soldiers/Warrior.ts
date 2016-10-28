class Warrior extends Soldier {
    public constructor() {
        super();
        
        this.addClip("warrior_east_fighting", ["east-fighting", "east-moving", "east-guarding"])
            .addClip("warrior_dying", "east-dying");
    }
}
