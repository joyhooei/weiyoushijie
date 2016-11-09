var Skill = (function () {
    function Skill(attrs) {
        this.attrs = attrs;
    }
    var d = __define,c=Skill,p=c.prototype;
    p.save = function () {
        return application.dao.save("Skill", this.attrs);
    };
    Skill.get = function (skills, claz, skill) {
        for (var i = 0; i < skills.length; i++) {
            if (skills[i].attrs.claz == claz && skills[i].attrs.skill == skill) {
                return skills[i];
            }
        }
        return null;
    };
    return Skill;
}());
egret.registerClass(Skill,'Skill');
//# sourceMappingURL=Skill.js.map