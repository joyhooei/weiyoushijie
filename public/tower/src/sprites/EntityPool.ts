class EntityPool {
    private _objs: Array<Entity>;

    public constructor() {
        this._objs = new Array<Entity>();
    }
    
    public get(className:string, options?any): Entity {
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
            obj.setMCs(application.characters[className].getMCs());
        }

        let properties = application.characters[className].getProperties() || {};
        if (options) {
           for (var key in options) {
              if (options.hasOwnProperty(key)) {
                 properties[key] = options[key];
              }
           }
        }
        
        obj.initialize(properties);
        
        return obj;
    }
    
    public set(obj:Entity) {
        this._objs.push(obj);
    }
}
