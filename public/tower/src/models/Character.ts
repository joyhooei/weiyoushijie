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
            {name: 'Sunwukong', properties:{hp:245, forceHigh:10, forceLow:6, armor: 15, idleTicks: 20 * application.frameRate, guardRadius: 50}},
            {name: 'Reinforce', properties:{hp:245, force:6, armor: 0, liveTicks: 20 * application.frameRate, guardRadius: 40}},

            {name: 'Fireball', properties:{force:6, moveSpeed:5}},
        ]; 

        for(let i = 0; i < config.length; i++) {
            let d = config[i];
            characters[d.name] = new Character(d.properties);
        }
        
        return characters;
    }
}
