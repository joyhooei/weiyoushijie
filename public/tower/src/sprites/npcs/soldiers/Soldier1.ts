class Soldier1 extends Soldier {
    public constructor() {
        super();
        
        this._displays.addClip("soldier1");
    }

    public paint() {
    	let display: egret.DisplayObject = this._displays.render(this, this._direction, this._state);
        if (display && this._hp) {
        	display.y = -10;
            display.x = -26;
            display.height = this.height - 3;
        }
    }
}
