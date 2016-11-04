class AnimatingEffect extends Effect {
    protected _idleTicks: number;

    protected _playTimes: number;
    
    public initialize(properties: any) {
        super.initialize(properties);
        
        this._idleTicks = this._get(properties, "idleTicks", (Math.random() * 10) * application.frameRate);

        this._playTimes = 0;
    }
    
    protected _idle() {
        if (this._ticks > this._idleTicks) {
            this.move();
        } else {        
            this._ticks ++;
        }
    }

    protected _act():boolean {
        this._playTimes --;
        if(this._playTimes <= 0) {
            return false;
        }

        return true;
    }
    
    protected _moving() {
        if (this._ticks % (application.frameRate << 3) == 0) {
            this._playTimes = 5;

            this.stain();
        }
        
        this._ticks ++;
    }    
}
