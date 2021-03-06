var Shaseng = (function (_super) {
    __extends(Shaseng, _super);
    function Shaseng() {
        _super.call(this);
        this.addClip("sunwukong_east_moving", ["east-moving", "south-moving", "north-moving"])
            .addBitmap("sunwukong_guarding_png", ["east-guarding", "west-guarding", "south-guarding", "north-guarding"])
            .addClip("sunwukong_west_fighting_1", ["west-fighting", "south-fighting", "north-fighting"])
            .addClip("sunwukong_east_fighting_2", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("sunwukong_east_fighting_3", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("sunwukong_dying", ["dying"]);
    }
    var d = __define,c=Shaseng,p=c.prototype;
    p._readyFight = function () {
        return true;
    };
    p._hitOpponents = function () {
    };
    return Shaseng;
}(Hero));
egret.registerClass(Shaseng,'Shaseng');
//# sourceMappingURL=Shaseng.js.map