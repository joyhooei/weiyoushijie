class Soldier1 extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("soldier1");
    }

    public paint() {
        return this._display(-10, -26, this.width, this.height - 3, idx);
    }
}
