class Spike extends Bullet {
    public constructor() {
        super();
        
        this.addClip("spike_fighting");
    }
    
    protected _hitTarget() {
        if (this._target.active()) {
            this._target.kill();
        }
    }       
}
