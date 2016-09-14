var Legend = (function () {
    function Legend(attrs) {
        this.attrs = attrs;
        this.skills = [];
    }
    var d = __define,c=Legend,p=c.prototype;
    p.addSkill = function (skill) {
        this.skills.push(new Skill(skill));
    };
    p.save = function () {
        application.dao.save("Legend", this.attrs);
    };
    Legend.getByName = function (legends, name) {
        for (var i = 0; i < legends.length; i++) {
            if (legends[i].attrs.name == name) {
                return legends[i];
            }
        }
        return new Legend({ level: 1 });
    };
    return Legend;
}());
egret.registerClass(Legend,'Legend');
//# sourceMappingURL=Legend.js.map