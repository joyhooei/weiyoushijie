class ScorchedEarth extends Bomb {
    public constructor() {
        super();
        
        this.addClip("scorchedearth_fighting");
    }
 
    public setTarget(target: NPC) {
        this._target  = target;
        
        this.setTargetPosition(this.getCenterX(), this.getCenterY() - 100);
    }

    protected _hitTarget() {
        let xy = this._nextStep();
        let x = xy[0] + (this.width >> 1);
        let y = xy[1] + (this.height >> 1);

        let tx = this._target.getCenterX();
        let ty = this._target.getCenterY();
        
        let radius = this._hitRadius >> 1;
        Bullet.throw(x, y, tx, ty - radius, "ScorchedEarthBomblet", {hitRadius: radius});
        Bullet.throw(x, y, tx, ty + radius, "ScorchedEarthBomblet", {hitRadius: radius});
        Bullet.throw(x, y, tx - radius, ty, "ScorchedEarthBomblet", {hitRadius: radius});
        Bullet.throw(x, y, tx + radius, ty, "ScorchedEarthBomblet", {hitRadius: radius});

        this.erase();
    }
}
