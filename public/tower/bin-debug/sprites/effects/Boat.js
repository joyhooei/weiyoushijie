var Boat = (function (_super) {
    __extends(Boat, _super);
    function Boat() {
        _super.call(this);
        this.addClip("boat_east_moving");
    }
    var d = __define,c=Boat,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._callback = null;
    };
    p.setCallback = function (cb) {
        this._callback = cb;
    };
    p._idle = function () {
        this.guard();
    };
    p._act = function () {
        if (this._callback) {
            this._callback(this);
            this._callback = null;
        }
        return false;
    };
    return Boat;
}(Effect));
egret.registerClass(Boat,'Boat');
//# sourceMappingURL=Boat.js.map