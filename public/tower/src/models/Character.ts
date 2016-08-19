class Character {
    private _properties: any[];

    constructor(properties: any) {
        this._properties = properties;
    }

    public getProperties(): any {
        return this._properties;
    }

    static createAll(): Character[] {
        let characters = new Array<Character>();
        
        let config = [
            //name, properties
            /*
            {name: 'MonkeyKing', properties:{hp:1000}},
            */
        ];   

        for(let i = 0; i < config.length; i++) {
            let d = config[i];
            characters[d.name] = new Character(d.properties);
        }
        
        return characters;
    }
}
