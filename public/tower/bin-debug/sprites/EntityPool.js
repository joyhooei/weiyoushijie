var EntityPool = (function () {
    function EntityPool() {
        this._entities = [];
    }
    var d = __define,c=EntityPool,p=c.prototype;
    p.get = function (claz, properties) {
        var entity = null;
        for (var i = 0; i < this._entities.length; i++) {
            entity = this._entities[i];
            if (claz == entity.getClassName()) {
                this._entities.splice(i, 1);
                break;
            }
            entity = null;
        }
        var character = application.characters[claz];
        if (!entity) {
            entity = Object.create(window[claz].prototype);
            entity.constructor.apply(entity);
        }
        var props = {};
        if (character) {
            props = character.getProperties() || {};
        }
        if (properties) {
            for (var key in properties) {
                if (properties.hasOwnProperty(key)) {
                    props[key] = properties[key];
                }
            }
        }
        entity.initialize(props);
        return entity;
    };
    p.set = function (entity) {
        for (var i = 0; i < this._entities.length; i++) {
            if (this._entities[i] == entity) {
                return;
            }
        }
        this._entities.push(entity);
    };
    return EntityPool;
}());
egret.registerClass(EntityPool,'EntityPool');
//# sourceMappingURL=EntityPool.js.map