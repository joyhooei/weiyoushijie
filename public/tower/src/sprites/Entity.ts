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
	protected _state: EntityState;
    protected _ticks: number;
    
    //面向
    protected _direction: EntityDirection;
    
    protected _repaint: boolean;
    
    protected _mc: egret.MovieClip;
    
    protected _parent: Entity;

    public constructor() {
        super();
	}
	
	/**初始化*/
    public initialize(properties: any):void {
        this._direction = this._get(properties, "direction", EntityDirection.east);
        this._state 	= this._get(properties, "state", EntityState.idle);
        this._ticks 	= 0;
        this._repaint = true;
    }
    
    public setParent(parent: Entity) {
    	this._parent = parent;
    }
    
    protected _get(properties: any, name:string, defaultVal:any): any {
    	if (properties && properties[name]) {
    		return properties[name];
    	} else {
    		return defaultVal;
    	}
    }

	public dead(): boolean {
		return this._state == EntityState.dead;
	}
	
	public dying(): boolean {
		return this._state == EntityState.dying;
	}

    public select(again:boolean) {
    }
    
    public deselect() {
    }
    
    /**更新状态*/
    public update():void {
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
    	
    	this._paint();
    }
    
    //根据状态、面向修改重新渲染
    protected _paint() {
    	if (this._repaint && this._state != EntityState.idle && this._state != EntityState.dead) {
	    	let mc = this._getMC();
	    	if (mc && mc != this._mc) {
		    	this.removeChild(this._mc);
		    	this._mc = mc;
		    	
		    	this.addChild(mc);
		    	mc.start();
	    	}
	    	
	    	this._repaint = false;
    	}
    }
    
    protected _getMC(): egret.MovieClip {
    	return application.characters[egret.getQualifiedClassName(this)].getMC(this._direction, this._state);
    }
    
    protected _do(state:EntityState) {
    	if (state != this._state && this._state != EntityState.dead) {
	    	this._stateChanged( this._state, state);
	    	
	    	this._ticks = 0;
	    	this._state = state;
	    	
	    	this._repaint = true;
    	}
    }

    //转向
    protected _turn(direction: EntityDirection) {
    	if (direction != this._direction) {
    		this._direction = direction;
    		
    		this._repaint = true;
    	}
    }
    
    protected _stateChanged(oldState: EntityState, newState: EntityState) {
    	if (this._parent && newState == EntityState.dead) {
    		this._parent.childDead(this);
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
	
	public intersect(x: number, y: number, radius: number):boolean {
		let dx = this.x - x;
		let dy = this.y - y;
		return (dx * dx + dy * dy <= radius * radius);
	}
	
	public collide(obj: Entity) {
		return !(obj.x > this.x + this.width || 
           obj.x + obj.width < this.x || 
           obj.y > this.y + this.height ||
           obj.y + obj.height < this.y);		
	}
	
    protected _direction8(x:number, y:number):EntityDirection {
        let angels = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];
        let directions = [EntityDirection.east, EntityDirection.northeast, EntityDirection.north, EntityDirection.northwest, EntityDirection.west, EntityDirection.southwest, EntityDirection.south, EntityDirection.southeast, EntityDirection.east ];
        
        return this._directionOf(x, y, angels, directions);
    }
    
    protected _direction4(x:number, y:number):EntityDirection {
        let angels = [60, 120, 240, 300, 360];
        let directions = [EntityDirection.east, EntityDirection.north, EntityDirection.west, EntityDirection.south, EntityDirection.east ];
        
        return this._directionOf(x, y, angels, directions);
    }
    
    protected _directionOf(x:number, y:number, angels:number[], directions:EntityDirection[]):EntityDirection {
        let dx: number = x - this.x;
        let dy: number = y - this.y;
        let angel = Math.atan2(dy, dx) * 180 / Math.PI + 180;
        
        for(let i = 0; i < angels.length; i++) {
        	if (angel <= angels[i]) {
        		return directions[i];
        	}
        }
    }
}
