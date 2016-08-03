class Soldier extends NPC {
    private _guardX: number;
    private _gradeY: number;
    
    private _enemy: Enemy;
    
    public constructor() {
        super();
    }
    
    protected _moving(ticks: number) {
        if (this.x == this._guardX && this.y == this._guardY) {
            this._changeState(ObjectState.fighting, ticks);
        } else {
            this._moveOneStep(this._guradX, this._guardY);
        }
    }
    
    protected _fighting(ticks: number) {
    }
}
