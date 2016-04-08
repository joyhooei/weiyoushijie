class Model {
	public id:string;
	
	public constructor() {
	}
	
	public set(data:{}):void{
		for(var name in data) {
			this[name] = data[name];
		}
	}
	
	public set(name:string, value:string):void{
		this[name] = value;
	}
	
	public get(name:string):string{
		return this[name];
	}
}