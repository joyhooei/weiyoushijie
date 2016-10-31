class ScorchedEarth extends Bomb {
    public constructor() {
        super();
        
        this.addClip("scorchedearth_fighting");
    }
    
    protected _hitTarget() {
        let x = this.getCenterX();
        let y = this.getCenterY();
        
        let radius = hitRadius >> 1;
        Bullet.throw(x, y, x, y - radius, "ScorchedEarth", {hitRadius: radius});
        Bullet.throw(x, y, x, y + radius, "ScorchedEarth", {hitRadius: radius});
        Bullet.throw(x, y, x - radius, y, "ScorchedEarth", {hitRadius: radius});
        Bullet.throw(x, y, x + radius, y, "ScorchedEarth", {hitRadius: radius});
    }
}
