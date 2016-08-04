class NPC extends Object {
    private _blood: number;
    
    private _damage: number;
    
    private _hitSpeed: number;
    
    private _moveSpeed: number;
    
    private _path: number[][];
    
    public constructor() {
        super();
    }
    
    protected _idle(ticks: number) {
        this._changeState(ObjectState.moving, ticks);
    }
    
    public hitBy(damage:number) {
        this._blood -= damage;
        if (this._blood < 0) {
            this._state = ObjectState.dying;
        }
    }
    
    private _hit(npc: NPC) {
        npc.hitBy(this._damage);
    }
    
    private _moveTo(path:number[][], ticks) {
        this._path = path;
        this._changeState(ObjectState.moving, ticks);
    }
    
    //是否到达终点
    private _moveOneStep(): bool {
        return false;
    }
}
