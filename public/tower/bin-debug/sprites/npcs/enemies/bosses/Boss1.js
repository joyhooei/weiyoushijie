var Boss1 = (function (_super) {
    __extends(Boss1, _super);
    function Boss1() {
        _super.call(this);
        this.addClip("enemy4_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy4_south_moving", ["south-moving", 'south-guarding'])
            .addClip("enemy4_north_moving", ["north-moving", 'north-guarding'])
            .addClip("enemy4_dying", "east-dying")
            .addClip("enemy4_east_fighting", "east-fighting");
    }
    var d = __define,c=Boss1,p=c.prototype;
    return Boss1;
}(Boss));
egret.registerClass(Boss1,'Boss1');
//# sourceMappingURL=Boss1.js.map