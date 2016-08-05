class EntityPool {
    private _objs : Entity[];

    public constructor() {
        this._objs = new Entity[];
    }
    
    public get(className:string): Entity {
        for(let i = 0; i < this._objs; i++) {
            let obj = this._objs[i];
            if (className == egret.getQualifiedClassName(obj)) {
                this._objs.splice(i, 1);
                return obj;
            }
        }
        
        let obj = Entity.create(window[className].prototype);
        obj.constructor.apply(obj);
        return obj;
    }
    
    public set(obj:Entity) {
        this._objs.push(obj);
    }
}
