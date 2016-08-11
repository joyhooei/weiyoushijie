class EntityPool {
    private _objs: Array<Entity>;

    public constructor() {
        this._objs = new Array<Entity>();
    }
    
    public get(className:string, properties?any): Entity {
        let obj:Entity = null;
        for(let i = 0; i < this._objs.length; i++) {
            obj = this._objs[i];
            if (className == egret.getQualifiedClassName(obj)) {
                this._objs.splice(i, 1);
                break;
            }
        }
        
        if (!obj) {
            obj = <Entity>Object.create(window[className].prototype);
            obj.constructor.apply(obj);
        }
        
        if (properties) {
            obj.initialize(properties);
        }
        
        return obj;
    }
    
    public set(obj:Entity) {
        this._objs.push(obj);
    }
}
