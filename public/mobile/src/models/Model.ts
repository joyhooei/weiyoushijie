class Model {
	public id:string;
	
	public constructor() {
		this.id = "";
	}
	
	public set(data:{}):void{
		for(var name in data) {
			this[name] = data[name];
		}
	}
}