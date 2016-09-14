var Skill = (function () {
    function Skill(attrs) {
        this.attrs = attrs;
    }
    var d = __define,c=Skill,p=c.prototype;
    p.save = function () {
        application.dao.save("Skill", this.attrs);
    };
    return Skill;
}());
egret.registerClass(Skill,'Skill');
//# sourceMappingURL=Skill.js.map