class Model {
	public id:string;
	
	public constructor() {
	}
	
	public set(data:{}):void{
		for(var name in data) {
			this[name] = data[name];
		}
	}
}