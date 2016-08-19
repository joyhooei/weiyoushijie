class NotMoveableTip extends Entity {
    public constructor() {
        super();
        
        this.kill();
    }
    
    protected _dying() {
        if (this._ticks > 20) {
            this.erase();
        }
    }
}
