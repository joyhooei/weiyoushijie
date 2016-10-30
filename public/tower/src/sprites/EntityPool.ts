class EntityPool {
    private _entities: Entity[];

    private _totalEntities: number;

    public constructor() {
        this._entities = [];
        
        this._totalEntities = 0;
    }

    private _get(claz:string): Entity {
        for(let i = 0; i < this._entities.length; i++) {
            let entity = this._entities[i];
            if (claz == entity.getClaz()) {
                this._entities.splice(i, 1);
                return entity;
            }
        }

        return null;        
    }
    
    public get(claz:string, properties?:any): Entity {        
        let character = application.characters[claz];
        
        let entity: Entity = this._get(claz);
        if (!entity) {
            entity = <Entity>Object.create(window[claz].prototype);
            entity.constructor.apply(entity);
            
            this._totalEntities ++;
            console.info("total entities is " + this._totalEntities + " new entity " + claz);
        } else {
            console.info("recycle entity " + claz);
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
        if(!this._exists(entity)) {
            this._entities.push(entity);
        }
    }

    private _exists(entity:Entity):boolean {
        for(let i = 0; i < this._entities.length; i++) {
            if (this._entities[i] == entity) {
                return true;
            }
        }

        return false;
    }
}
