var EntityPool = (function () {
    function EntityPool() {
        this._objs = new Array();
    }
    var d = __define,c=EntityPool,p=c.prototype;
    p.get = function (className, options) {
        var obj = null;
        for (var i = 0; i < this._objs.length; i++) {
            obj = this._objs[i];
            if (className == egret.getQualifiedClassName(obj)) {
                this._objs.splice(i, 1);
                break;
            }
        }
        if (!obj) {
            obj = Object.create(window[className].prototype);
            obj.constructor.apply(obj);
            obj.setMCs(application.characters[className].getMCs());
        }
        var properties = application.characters[className].getProperties() || {};
        if (options) {
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    properties[key] = options[key];
                }
            }
        }
        obj.initialize(properties);
        return obj;
    };
    p.set = function (obj) {
        this._objs.push(obj);
    };
    return EntityPool;
}());
egret.registerClass(EntityPool,'EntityPool');
//# sourceMappingURL=EntityPool.js.map