class Soldier1 extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("soldier1");
    }

    public paint() {
        this._paintDisplay(-10, -26);
    }
}
