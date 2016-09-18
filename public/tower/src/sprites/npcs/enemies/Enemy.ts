class Enemy extends NPC {
    protected _soldiers: Soldier[];
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;
    
    //击毙后可以获取的金币
    protected _bonus: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._bonus = this._get(properties, "bonus", 10);

        this._idleTicks = this._get(properties, "idleTicks", Math.random() * 500);
        
        this._soldiers = [];
        
        this._paths = this._get(properties, "paths", 10);
        this._path  = 0;
        this._nextPath();
    }
    
    public addSoldier(soldier: Soldier) {
        this._soldiers.push(soldier);
        this.guard();
        
        this._face(this._soldiers[0]);
    }
    
    public totalSoldiers(): number {
        return this._soldiers.length;
    }
    
    public rmvSoldier(soldier: Soldier) {
        for(let i = 0;i < this._soldiers.length; i++) {
            if (this._soldiers[i] == soldier) {
                this._soldiers.splice(i, 1);   
            }
        }
        
        if (this._soldiers.length == 0) {
            this.move();
        } else {
            this._face(this._soldiers[0]);
        }
    }
    
    private _nextPath(): boolean {
    	if (this._path < this._paths.length - 1) {
	    	let p0 = this._paths[this._path];
	    	
	   		this.setCenterX(p0[0]);
	   		this.setBottomY(p0[1]);

	        this._path ++;
	        
            let p1 = this._paths[this._path];

	        this._computeSteps(p0[0], p0[1], p1[0], p1[1]);
            this._turn(this._direction8(p1[0], p1[1]));
	        
	        return true;
    	} else {
    		return false;
    	}
    }
    
    public move() {
    	super.move();
    	
        let path = this._paths[this._path];
        this._turn(this._direction8(path[0], path[1]));
    }
    
    public kill() {
    	super.kill();
    	
    	application.battle.incGolds(this._bonus);
    }

    protected _moving() {
        if (this._moveOneStep() && !this._nextPath()) {
            application.battle.incLives(-1);

            this.erase();
        }
    }
    
    protected _hitOpponents() {
    	if (this._soldiers.length > 0) {
	        if (this._soldiers[0].hitBy(this)) {
	            this.rmvSoldier(this._soldiers[0]);
	        }
    	} else {
    		this.move();
    	}
    }    
}
