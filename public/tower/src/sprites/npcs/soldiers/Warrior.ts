class Warrior extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("warrior_east_fighting", "east-fighting")
                .addClip("warrior_dying", "dying");
    }
}
