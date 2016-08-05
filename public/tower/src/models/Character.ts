interface ICharacterDictionary {
     [index: string]: Character;
}

class Character {
    private _mcs: egret.MovieClip[][];
    
    private _properties: any;
    
    constructor(properties: any) {
        this._properties = properties;
        this._mcs = new egret.MovieClip[][];
    }
    
    public getProperty(name:string):number{
        return this._properties[name];
    }
    
    public addMC(mc:egret.MovieClip, direction:EntityDirection, state:EntityState) {
        this._mcs[state][direction] = mc;
    }
    
    public getMC(direction:EntityDirection, state:EntityState):egret.MovieClip {
        egret.MovieClip mc = this._mcs[state][direction];
        if (!mc) {
            for(var i = 0; i < this._mcs[state].length; i++) {
                if (this._mcs[state][i]) {
                    return this._mcs[state][i];
                }
            }
        }
        
        return mc;
    }
    
    static createAll(): ICharacterDictionary {
        let characters = new ICharacterDictionary();
        
        let data = [
            //name, properties [mc_direction, mc_state, mc_name]
            ['', {}, []],
        ];
        
        var data = RES.getRes("animation.json");
        var txtr = RES.getRes("animation.png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );

        for(let i = 0; i < data.lengths; i++) {
            let character = new Character(data[1]);
            
            let d = data[2];
            let mc:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( d[0] ) );
            
            character.addMC(mc, d[1], d[2]);
            
            characters[data[0]] = character;
        }
        
        return characters;
    }

}
