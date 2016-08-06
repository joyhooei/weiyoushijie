class Character {
    private _mcs: egret.MovieClip[][];
    
    private _properties: any;
    
    constructor(properties: any) {
        this._properties = properties;
        this._mcs = new Array<Array<egret.MovieClip>>();
    }
    
    public getProperty(name:string):number{
        return this._properties[name];
    }
    
    public addMC(mc:egret.MovieClip, direction:EntityDirection, state:EntityState) {
        this._mcs[state][direction] = mc;
    }
    
    public getMC(direction:EntityDirection, state:EntityState):egret.MovieClip {
        let mc = this._mcs[state][direction];
        if (!mc) {
            for(var i = 0; i < this._mcs[state].length; i++) {
                if (this._mcs[state][i]) {
                    return this._mcs[state][i];
                }
            }
        }
        
        return mc;
    }
    
    static createAll(): Character[] {
        let characters = new Array<Character>();
        
        let config = [
            //name, properties [mc_direction, mc_state, mc_name]
            /*
            {name: 'hero', properties:{hp:1000}, mcs:[
                        { dir: EntityDirection.east, state: EntityState.moving, name:'test' },
                        { dir: EntityDirection.west, state: EntityState.moving, name: 'test' },
                    ]},
            */
        ];
        
        let data = RES.getRes("animation.json");
        let txtr = RES.getRes("animation.png");
        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );

        for(let i = 0; i < config.length; i++) {
            let d = config[i];
            
            let character = new Character(d.name);
            
            for(let j = 0; j < d.mcs.length; j++) {
                let mc:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( d.mcs[j].name ) );
            
                character.addMC(mc, d.mcs[j].dir, d.mcs[j].state);
            }
            
            characters[d.name] = character;
        }
        
        return characters;
    }

}
