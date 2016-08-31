class Enemy1 extends Enemy {
    public constructor() {
        super();
        
        this._displays.addClip("enemy1");
    }

    public paint() {
        return this._display(-3, -10);
    }
}
