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
	protected _clip: egret.MovieClip;
	protected _clipPlaying: boolean;
    
    protected _sounds: EntitySounds;

    public constructor() {
        super();
        
        this._displays = new EntityDisplays();
        
        this._displaySprite = new egret.Sprite();
        this.addChild(this._displaySprite);
        
        this._sounds = new EntitySounds();
	}
	
    public initialize(properties: any):void {
        this._direction = this._get(properties, "direction", EntityDirection.east);
        this._state 	= this._get(properties, "state", EntityState.idle);
        this._ticks 	= 0;

		this._displaySprite.removeChildren();
		
		this._clip = null;
		this._clipPlaying = false;
    }
    
    protected _get(properties: any, name:string, defaultVal:any): any {
    	if (properties && properties[name]) {
    		return properties[name];
    	} else {
    		return defaultVal;
    	}
    }
	
	public getClaz() {
		return egret.getQualifiedClassName(this);
	}
	
	public getSuperClaz() {
		return egret.getQualifiedSuperclassName(this);
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
	
	public getBottomY(): number {
		return this.y + this.height;
	}

    public stain() {
		//application.battle.addDirt(this);
		this.paint();
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
		if (this._state > EntityState.idle && this._state < EntityState.dead) {
			let display:egret.DisplayObject = this._render();
			if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
				this._clip = <egret.MovieClip>display;
    			this._play();
			} else {
				this._act();
			}
		} else {
			if (this._clip) {
				this._clip.stop();
			}
			
			this._displaySprite.removeChildren();
			this._clip = null;
			this._clipPlaying = false;
		}
    }

	public addBitmap(name:string, action?): Entity {
		let bm = this._displays.addBitmap(name, action);

		if (bm && bm.width > 0 && bm.height > 0) {
			this.width  = bm.width;
			this.height = bm.height;
		}

		return this;
	}

	public addClip(name:string, action?): Entity {
		let clip = this._displays.addClip(name, action);

		if (clip && clip.width > 0 && clip.height > 0) {
			this.width  = clip.width;
			this.height = clip.height;
		}

		return this;
	}
    
    protected _play() {
		this._clip.addEventListener(egret.Event.COMPLETE, this._playCompleted, this);

		this._clipPlaying = true;
		this._clip.gotoAndPlay(0, 1);
    }

	protected _playCompleted() {
		if (this._act()) {
			this._clipPlaying = true;
			this._clip.gotoAndPlay(0, 1);
		} else {
			this._clipPlaying = false;
			this._clip.removeEventListener(egret.Event.COMPLETE, this._playCompleted, this);
		}
	}
    
    protected _render(xDelta = 0, yDelta = 0, idx = 0): egret.DisplayObject {
		let display = this._displays.getDisplay(this._direction, this._state, idx);
        if (display) {
			if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
				//动画的中点是（0， 0）
				this._displaySprite.x = (display.width >> 1) + xDelta;
				this._displaySprite.y = (display.height >> 1) + yDelta;
			} else {
				//图片的左边顶点是（0， 0）
				this._displaySprite.x = xDelta;
				this._displaySprite.y = yDelta;
			}

			//更换图片后，需要和上次图片的中点保持一致
			if (this.width != display.width) {
				this.x -= (display.width  - this.width) >> 1;
				this.y -= (display.height - this.height) >> 1;
			}

			this.width  = display.width;
			this.height = display.height;

			this._displaySprite.removeChildren();
			display.x = display.y = 0;
            this._displaySprite.addChild(display);
        } else {
            console.error("display dosn't exist for " + this.getClaz() + " direction = " + Entity.directionName(this._direction) + " state = " + Entity.stateName(this._state));
        }

		return display;
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
	    	
	    	this._sounds.play(this._state);
	    	
	    	this.stain();
    	}
    }

    //转向
    protected _turn(direction: EntityDirection) {
    	if (direction != this._direction) {
    		this._direction = direction;
    		
    		this.stain();
    	}
    }
	
	//执行具体的动作，返回值true表示继续播放下一个动作
	protected _act():boolean {
		return true;
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
			let dx = this.getCenterX() - x;
			let dy = this.getBottomY() - y;
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
    
    protected _directionAt(x:number, y:number):EntityDirection {
        return Entity.direction8(this.x, this.y, x, y);
    }
	
	public static random(low: number, high: number) : number {
		return Math.random() * (high - low) + low;
	}

    public static direction4(x1:number, y1:number, x2:number, y2:number): EntityDirection {
        return Entity.direction(
							x1, y1, x2, y2, 
							[45, 135, 225, 315, 360], 
							[EntityDirection.east, EntityDirection.north, EntityDirection.west, EntityDirection.south, EntityDirection.east]);
    }
    
    public static direction8(x1:number, y1:number, x2:number, y2:number): EntityDirection {
        return Entity.direction(
							x1, y1, x2, y2, 
							[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360], 
							[EntityDirection.east, EntityDirection.northeast, EntityDirection.north, EntityDirection.northwest, EntityDirection.west, EntityDirection.southwest, EntityDirection.south, EntityDirection.southeast, EntityDirection.east ]);
    }
	
    private static direction(x1:number, y1:number, x2:number, y2:number, angels:number[], directions:EntityDirection[]):EntityDirection {
        let dx: number = x2 - x1;
        let dy: number = y1 - y2;
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
