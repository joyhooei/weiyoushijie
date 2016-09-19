var Result = (function () {
    function Result(attrs) {
        this.attrs = attrs;
    }
    var d = __define,c=Result,p=c.prototype;
    p.save = function () {
        application.dao.save("Result", this.attrs);
    };
    return Result;
}());
egret.registerClass(Result,'Result');
//# sourceMappingURL=Result.js.map