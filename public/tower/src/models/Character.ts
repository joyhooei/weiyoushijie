class Character {
    private _properties: any;
    
    private _factory: egret.MovieClipDataFactory;
    
    private _mcs: string[];

    constructor(properties: any, mcs:string[], factory: egret.MovieClipDataFactory) {
        this._properties = properties;
        
        this._mcs = mcs;
        
        this._factory = factory;
    }

    public getProperties(): any {
        return this._properties;
    }

    public getMCs(): egret.MovieClip[] {
        let mcs = [];

        for(let j = 0; j < this._mcs.length; j++) {
            let mc = new egret.MovieClip(this._factory.generateMovieClipData(this._mcs[j]));
            
            mc.frameRate = application.frameRate;
            
            mcs.push(mc);
        }
        
        return mcs;
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
        let factory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        
        for(let i = 0; i < config.length; i++) {
            let d = config[i];
            characters[d.name] = new Character(d.properties, d.mcs, factory);
        }
        
        return characters;
    }
}
