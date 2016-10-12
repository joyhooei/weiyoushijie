class EntitySounds {
    private _sounds: string[];

    public constructor() {
        this._sounds = [];
    }
    
    public add(sound:string, state:number) {
        this._sounds[state] = sound;
    }
    
    public play(state:number) {
        let name = this._sounds[state];
        if (name) {
            var sound_eff: egret.Sound = RES.getRes(name);
            sound_eff.type = egret.Sound.EFFECT;
            sound_eff.play();
        }
    }
}
