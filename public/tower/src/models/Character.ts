class Character {
    private _mcs: egret.MovieClip[];
    
    private _properties: any;
    
    constructor(properties: any) {
        this._properties = properties;
        
        this._mcs = [];
    }

    public getProperties():any {
        return_properties;
    }
    
    public addMC(mc:egret.MovieClip) {
        this._mcs.push(mc);
    }
    
    public getMC(idx:number):egret.MovieClip {
        return this._mcs[idx];
    }
    
    static createAll(): Character[] {
        let characters = new Array<Character>();
        
        let config = [
            //name, properties [ mc_name]
            /*
            {name: 'MonkeyKing', properties:{hp:1000}, mcs:['test', 'test1']},
            */
        ];
        
        let data = RES.getRes("animation.json");
        let txtr = RES.getRes("animation.png");
        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );

        for(let i = 0; i < config.length; i++) {
            let d = config[i];
            
            let character = new Character(d.name);
            
            for(let j = 0; j < d.mcs.length; j++) {
                let mc:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( d.mcs[j][j] ) );
            
                character.addMC(mc);
            }
            
            characters[d.name] = character;
        }
        
        return characters;
    }
}
