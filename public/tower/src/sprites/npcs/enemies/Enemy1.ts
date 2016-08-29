class Enemy1 extends Enemy {
    public constructor() {
        super();
        
        this._displays.addClip("enemy1");
    }

    public paint() {
    	let display: egret.DisplayObject = this._displays.render(this, this._direction, this._state);
        if (display && this._hp) {
        	display.y = 3;
            display.x = -10;
            display.height = this.height - 3;
        }
    }
}
