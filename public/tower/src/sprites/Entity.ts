enum EntityState {
    idle = 0,
    building,
    moving,
    guarding,
    fighting,
    dying,
    dead
};

enum EntityDirection {
    north = 0,
    northeast,
    east,
    southeast,
    south,
    southwest,
    west,
    northwest
};

class Entity extends egret.Sprite {
	private _state: EntityState;
	
    protected _ticks: number;
    
    //面向
    private _direction: EntityDirection;
    
    private _dirty: boolean;
    
    protected _mcs: egret.MovieClip[];
    protected _mc: egret.MovieClip;

    public constructor() {
        super();
	}
	
    public initialize(properties: any):void {
        this._direction = this._get(properties, "direction", EntityDirection.east);
        this._state 	= this._get(properties, "state", EntityState.idle);
        this._ticks 	= 0;
        this._dirty   	= true;
    }
    
    protected _get(properties: any, name:string, defaultVal:any): any {
    	if (properties && properties[name]) {
    		return properties[name];
    	} else {
    		return defaultVal;
    	}
    }
	
	public getClassName() {
		return egret.getQualifiedClassName(this);
	}
	
	public getSuperClassName() {
		return egret.getQualifiedSuperclassName(this);
	}

    public getMapX(): number {
    	if (this.parent != application.battle) {
    		return (<Entity>this.parent).getMapX() + this.x;
    	} else {
    		return this.x;
    	}
    }
    
    public getMapY(): number {
    	if (this.parent != application.battle) {
    		return (<Entity>this.parent).getMapY() + this.y;
    	} else {
    		return this.y;
    	}
    }
    
    public dirty(): boolean {
    	return this._dirty;
    }
    
    public stain() {
    	this._dirty = true;
    }
	
	public build() {
		this._do(EntityState.building);
	}
	
	public move() {
		this._do(EntityState.moving);
	}
	
	public guard() {
		this._do(EntityState.guarding);
	}
	
	public fight() {
		this._do(EntityState.fighting);
	}
	
	public kill() {
		this._do(EntityState.dying);
	}
    
    public erase() {
    	this._do(EntityState.dead);
    	
    	if (this.parent) {
    		this.parent.removeChild(this);
    	}
    	
    	application.pool.set(this);
    }

	public active(): boolean {
		return this._state < EntityState.dying;
	}

	public dead(): boolean {
		return this._state == EntityState.dead;
	}
	
    public select(again:boolean) {
    }
    
    public deselect() {
    }
    
    public update():boolean {
    	this._ticks++;
    	
    	switch(this._state) {
		    case EntityState.idle:
		    	this._idle();
		    	break;
		    	
            case EntityState.building:
		    	this._building();
		    	break;
		    	
            case EntityState.moving:
		    	this._moving();
		    	break;
		    	
            case EntityState.guarding:
		    	this._guarding();
		    	break;

            case EntityState.fighting:
		    	this._fighting();
		    	break;
		    	
            case EntityState.dying:
		    	this._dying();
		    	break;
    	}

    	if (this._dirty && this.active()) {
        	this.paint();
        	
        	this._dirty = false;
    	}
    	
    	return this.dead();
    }
    
    public setMCs(mcs: egret.MovieClip[]) {
    	this._mcs = mcs;
    }
    
    //根据状态、面向修改重新渲染
    public paint() {
    	let mc = this._getCurrentMC();
    	if (mc && mc != this._mc) {
	    	this.removeChild(this._mc);
	    	this._mc = mc;
	    	
	    	this.addChild(mc);
	    	mc.play();
    	}
    }

    protected _getCurrentMC(): egret.MovieClip {
    	return this._mcs[0];
    }
    
    private _do(state:EntityState) {
    	if (state != this._state) {
    		//dead状态不需要再变更状态了
    		//当前状态如果是dying，新状态只能是dead
    		if (this._state == EntityState.dead || (this._state == EntityState.dying && state != EntityState.dead)) {
    			return;
    		}

	    	this._ticks = 0;
	    	this._state = state;
	    	
	    	this._dirty = true;
    	}
    }

    //转向
    protected _turn(direction: EntityDirection) {
    	if (direction != this._direction) {
    		this._direction = direction;
    		
    		this._dirty = true;
    	}
    }

    protected _idle() {
    }
    
    protected _building() {
    }

    protected _moving() {
    }

    protected _guarding() {
    }
    
    protected _fighting() {
    }
    
    protected _dying() {
    }
	
	public within(x: number, y: number, radius: number):boolean {
		if (Entity.intersect(this.x, this.y, this.width, this.height, x - radius, y - radius, radius + radius, radius + radius)) {
			let dx = this.x + this.width / 2  - x;
			let dy = this.y + this.height / 2 - y;
			return (dx * dx + dy * dy <= radius * radius);
		} else {
			return false;
		}
	}
	
	public collide(entity: Entity) {
		return Entity.intersect(entity.x, entity.y, entity.width, entity.height, this.x, this.y, this.width, this.height);
	}
	
	public static intersect(x1:number, y1:number, width1:number, height1:number, x2:number, y2:number, width2:number, height2:number):boolean {
		return !(x1 > x2 + width2 ||  x1 + width1 < x2 || y1 > y2 + height2 || y1 + height1 < y2);		
	}
	
    protected _direction8(x:number, y:number):EntityDirection {
        let angels = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];
        let directions = [EntityDirection.east, EntityDirection.northeast, EntityDirection.north, EntityDirection.northwest, EntityDirection.west, EntityDirection.southwest, EntityDirection.south, EntityDirection.southeast, EntityDirection.east ];
        
        return Entity.direction(this.x, this.y, x, y, angels, directions);
    }
    
    protected _direction4(x:number, y:number):EntityDirection {
        return Entity.direction4(this.x, this.y, x, y);
    }
    
    public static direction4(x1:number, y1:number, x2:number, y2:number):EntityDirection {
        let angels = [60, 120, 240, 300, 360];
        let directions = [EntityDirection.east, EntityDirection.north, EntityDirection.west, EntityDirection.south, EntityDirection.east ];
        
        return Entity.direction(x1, y1, x2, y2, angels, directions);
    }
    
    public static direction(x1:number, y1:number, x2:number, y2:number, angels:number[], directions:EntityDirection[]):EntityDirection {
        let dx: number = x2 - x1;
        let dy: number = y2 - y1;
        let angel = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        
        for(let i = 0; i < angels.length; i++) {
        	if (angel <= angels[i]) {
        		return directions[i];
        	}
        }
    }
}
