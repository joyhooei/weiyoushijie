class ScorchedEarth extends Magic {
    protected _hitRadius: number;
    
    public constructor() {
        super();
        
        this.addClip("scorchedearth_fighting");
    }
    
    public initialize(properties:any) {
        super.initialize(properties);

        this._hitRadius = this._get(properties, 'hitRadius', 50);
    }
    
    protected _hitTarget() {
        let x = this.getCenterX();
        let y = this.getCenterY();
        
        Bullet.throw(x, y, x, y - this._hitRadius, "ScorchedEarth", {hitRadius: hitRadius});
        Bullet.throw(x, y, x, y + this._hitRadius, "ScorchedEarth", {hitRadius: hitRadius});
        Bullet.throw(x, y, x - this._hitRadius, y, "ScorchedEarth", {hitRadius: hitRadius});
        Bullet.throw(x, y, x + this._hitRadius, y, "ScorchedEarth", {hitRadius: hitRadius});
    }
}
