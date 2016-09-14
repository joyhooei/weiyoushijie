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

    protected _displays: EntityDisplays;
    
    protected _displaySprite: egret.Sprite;
    
    protected _sounds: EntitySounds;

    public constructor() {
        super();
        
        this._displays = new EntityDisplays(this.getClassName());
        
        this._displaySprite = new egret.Sprite();
        this.addChild(this._displaySprite);
        
        this._sounds = new EntitySounds();
	}
	
    public initialize(properties: any):void {
        this._direction = this._get(properties, "direction", EntityDirection.east);
        this._state 	= this._get(properties, "state", EntityState.idle);
        this._ticks 	= 0;
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

	public setCenterX(x:number) {
		this.x = x - (this.width >> 1);
	}

	public setCenterY(y:number) {
		this.y = y - (this.height >> 1);
	}
    
    public getCenterX(): number {
    	return this.x + (this.width >> 1);
    }
    
    public getCenterY(): number {
    	return this.y + (this.height >> 1);
    }

	public setBottomY(y:number) {
		this.y = y - this.height;
	}

    public stain() {
    	application.battle.addDirt(this);
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

    	return this.dead();
    }

    //根据状态、面向修改重新渲染
    public paint() {
    	this._display();
    }
    
    protected _display(xDelta = 0, yDelta = 0, idx = 0): egret.DisplayObject {
		let d = this._displays.render(this._displaySprite, this._direction, this._state, idx);

		this._displaySprite.x += xDelta;
		this._displaySprite.y += yDelta;
		this._displaySprite.width  = d.width;
		this._displaySprite.height = d.height;

		this.width  = d.width;
		this.height = d.height;
		
		return d;
    }
    
    private _do(state:EntityState) {
    	if (state != this._state) {
			console.log(this.getClassName() + " changed from " + Entity.stateName(this._state) + " to state " + Entity.stateName(state));

    		//dead状态不需要再变更状态了
    		//当前状态如果是dying，新状态只能是dead
    		if (this._state == EntityState.dead || (this._state == EntityState.dying && state != EntityState.dead)) {
    			return;
    		}

	    	this._ticks = 0;
	    	this._state = state;
	    	
	    	this._sounds.play(this._state);
	    	
	    	this.stain();
    	}
    }

    //转向
    protected _turn(direction: EntityDirection) {
    	if (direction != this._direction) {
			console.log(this.getClassName() + " trun from " + Entity.directionName(this._direction) + " to direction " + Entity.directionName(direction));

    		this._direction = direction;
    		
    		this.stain();
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
        let angel = Math.atan2(dy, dx) * 57.29578049044297; //180 / Math.PI;
        if (angel < 0) {
        	angel += 360;
        }
        
        for(let i = 0; i < angels.length; i++) {
        	if (angel <= angels[i]) {
        		return directions[i];
        	}
        }
    }

	public static directionName(direction:EntityDirection): string {
		let directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];

		return directions[direction];
	}


	public static stateName(state:EntityState): string {
		let states = ['idle', 'building', 'moving', 'guarding', 'fighting', 'dying', 'dead'];

		return states[state];
	}	
}
