var EntityPool = (function () {
    function EntityPool() {
        this._objs = new Array();
    }
    var d = __define,c=EntityPool,p=c.prototype;
    p.get = function (className) {
        for (var i = 0; i < this._objs.length; i++) {
            var obj_1 = this._objs[i];
            if (className == egret.getQualifiedClassName(obj_1)) {
                this._objs.splice(i, 1);
                return obj_1;
            }
        }
        var obj = Object.create(window[className].prototype);
        obj.constructor.apply(obj);
        return obj;
    };
    p.set = function (obj) {
        this._objs.push(obj);
    };
    return EntityPool;
}());
egret.registerClass(EntityPool,'EntityPool');
//# sourceMappingURL=EntityPool.js.map