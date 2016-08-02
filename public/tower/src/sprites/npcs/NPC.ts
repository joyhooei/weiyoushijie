class NPC extends Object {
    private _blood: number;
    
    private _damage: number;
    
    public constructor() {
        super();
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
}
