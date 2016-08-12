class Bullet extends MovableEntity {
    private _target: NPC;

    private _damage: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._target  = null;

        this._damage = this._get(properties, 'damage', 10);
    }
    
    public setTarget(target: NPC) {
        this._target  = target;
    }
}
