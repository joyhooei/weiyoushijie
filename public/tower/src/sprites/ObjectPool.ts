class ObjectPool {
    private _objs : Object[];

    public constructor() {
        this._objs = new Object[];
    }
    
    public get(className:string): Object {
        for(let i = 0; i < this._objs; i++) {
            let obj = this._objs[i];
            if (className == egret.getQualifiedClassName(obj)) {
                this._objs.splice(i, 1);
                return obj;
            }
        }
        
        let obj = Object.create(window[className].prototype);
        obj.constructor.apply(obj);
        return obj;
    }
    
    public set(obj:Object) {
        this._objs.push(obj);
    }
}
