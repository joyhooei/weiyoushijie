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
    
    public addMC(mc:egret.MovieClip, direction:ObjectDirection, state:ObjectState) {
        this._mcs[direction][state] = mc;
    }

    static createAll(): ICharacterDictionary {
        let characters = new ICharacterDictionary();
        
        let data = [
            //name, properties [mc_direction, mc_state, mc_name]
            '', 
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
    
    public getProperty(name:string):number{
        return this._properties[name];
    }
    
    public render(sprite:egret.Sprite, direction:ObjectDirection, state:ObjectState) {
        sprite.removeChildren();
        
        let mc = this._mcs[direction][state];
        sprite.addChild(mc);
        mc.play();
    }
}
