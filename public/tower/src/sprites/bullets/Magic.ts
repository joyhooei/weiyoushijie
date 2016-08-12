class Magic extends Bullet {
    public constructor() {
        super();
    }
    
    public setTarget(target: NPC) {
        super.setTarget(target);

        this._computeSteps(target.x, target.y);
    }
}
