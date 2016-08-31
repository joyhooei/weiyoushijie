class Enemy1 extends Enemy {
    public constructor() {
        super();
        
        this._displays.addClip("enemy1");
    }

    public paint() {
        this._display(-3, -10, this.width, this.height);
    }
}
