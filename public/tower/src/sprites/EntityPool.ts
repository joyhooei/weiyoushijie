class EntityPool {
    private _entities: Entity[];

    public constructor() {
        this._entities = [];
    }
    
    public get(claz:string, properties?:any): Entity {
        let entity: Entity = null;
        for(let i = 0; i < this._entities.length; i++) {
            entity = this._entities[i];
            if (claz == entity.getClaz()) {
                this._entities.splice(i, 1);
                break;
            }
            entity = null;
        }
        
        let character = application.characters[claz];
        
        if (!entity) {
            entity = <Entity>Object.create(window[claz].prototype);
            entity.constructor.apply(entity);
        }

        let props = {};
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
    }

    public set(entity:Entity) {
        for(let i = 0; i < this._entities.length; i++) {
            if (this._entities[i] == entity) {
                return;
            }
        }
        
        this._entities.push(entity);
    }
}
