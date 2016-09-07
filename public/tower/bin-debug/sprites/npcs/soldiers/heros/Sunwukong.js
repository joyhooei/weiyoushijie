var Sunwukong = (function (_super) {
    __extends(Sunwukong, _super);
    function Sunwukong() {
        _super.call(this);
        this._displays.addClip("sunwukong_east_moving", "east-moving")
            .addClip("sunwukong_east_moving", "guarding")
            .addClip("sunwukong_east_fighting_1", "east-fighting")
            .addClip("sunwukong_east_fighting_2", "east-fighting")
            .addClip("sunwukong_east_fighting_3", "east-fighting");
    }
    var d = __define,c=Sunwukong,p=c.prototype;
    return Sunwukong;
}(Hero));
egret.registerClass(Sunwukong,'Sunwukong');
//# sourceMappingURL=Sunwukong.js.map