class ObjectPool {
    private _objs : Object[];

    public constructor() {
        this._objs = new Object[];
    }
    
    public get(className:string, count:number): Object[] {
        let objs = new Object[];
        
        for(let i = 0; i < this._objs && objs.length < count; i++) {
            let obj = this._objs[i];
            if (className == egret.getQualifiedClassName(obj)) {
                objs.push(obj);
                this._objs.splice(i, 1);
            }
        }
        
        for (let i = objs.length; i < count; i++) {
            var obj = Object.create(window[className].prototype);
            obj.constructor.apply(obj);
            objs.push(obj);          
        }
        
        return objs;
    }
    
    public set(obj:Object) {
        this._objs.push(obj);
    }
}
