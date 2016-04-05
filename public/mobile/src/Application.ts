module application {
    export var router: Router;
    export var dao: Dao;

    export function init(main:Main){
		router = new Router(main);
		dao = new Dao("http://headlines.leanapp.cn/api/");
    }
}