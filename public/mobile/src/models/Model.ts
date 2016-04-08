class Model {
	public id:string;
	
	public attributes:any;
	
	public constructor() {
	}
	
	public set(data:any):void{
		attributes = data;
		if (data.id) {
			id = data.id;
		}
	}
}