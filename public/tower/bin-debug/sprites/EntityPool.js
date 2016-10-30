var EntityPool = (function () {
    function EntityPool() {
        this._entities = [];
        this._totalEntities = 0;
    }
    var d = __define,c=EntityPool,p=c.prototype;
    p._get = function (claz) {
        for (var i = 0; i < this._entities.length; i++) {
            var entity = this._entities[i];
            if (claz == entity.getClaz()) {
                this._entities.splice(i, 1);
                return entity;
            }
        }
        return null;
    };
    p.get = function (claz, properties) {
        var character = application.characters[claz];
        var entity = this._get(claz);
        if (!entity) {
            entity = Object.create(window[claz].prototype);
            entity.constructor.apply(entity);
            this._totalEntities++;
            console.info("total entities is " + this._totalEntities + " new entity " + claz);
        }
        else {
            console.info("recycle entity " + claz);
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
        if (!this._exists(entity)) {
            this._entities.push(entity);
        }
    };
    p._exists = function (entity) {
        for (var i = 0; i < this._entities.length; i++) {
            if (this._entities[i] == entity) {
                return true;
            }
        }
        return false;
    };
    return EntityPool;
}());
egret.registerClass(EntityPool,'EntityPool');
//# sourceMappingURL=EntityPool.js.map