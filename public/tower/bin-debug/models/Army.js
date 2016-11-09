var Army = (function () {
    function Army(attrs) {
        this.attrs = attrs;
    }
    var d = __define,c=Army,p=c.prototype;
    p.save = function () {
        return application.dao.save("Army", this.attrs);
    };
    Army.getHero = function (armies) {
        for (var i = 0; i < armies.length; i++) {
            if (armies[i].attrs.role == 1) {
                return armies[i];
            }
        }
        return null;
    };
    return Army;
}());
egret.registerClass(Army,'Army');
//# sourceMappingURL=Army.js.map