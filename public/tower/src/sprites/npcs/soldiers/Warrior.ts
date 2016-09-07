class Warrior extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("warrior_east_fighting", "east-fighting").addClip("warrior_dying", "dying");
    }

    public paint() {
        this._display(-10, -26, this.width, this.height);
    }
}
