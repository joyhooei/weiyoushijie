class Model {
	public id:string;
	
	public attributes:any;
	
	public constructor() {
	}
	
	public set(data:any):void{
		this.attributes = data;
		if (data.id) {
			this.id = data.id;
		}
	}
	
	public get(name:string):string{
		return this.attributes[name];
	}
}