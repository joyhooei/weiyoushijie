/**
 * Created by egret on 2016/1/22.
 */
var GameEvents = (function () {
    function GameEvents() {
    }
    var d = __define,c=GameEvents,p=c.prototype;
    GameEvents.EVT_RETURN = "EVT_RETURN";
    GameEvents.EVT_LOAD_PAGE = "EVT_LOAD_PAGE";
    GameEvents.EVT_CLOSE_ABOUT = "EVT_CLOSE_ABOUT";
    GameEvents.EVT_LOGIN_IN_SUCCESS = "EVT_LOGIN_IN_SUCCESS";
    GameEvents.EVT_LOGIN_OUT_SUCCESS = "EVT_LOGIN_OUT_SUCCESS";
    GameEvents.EVT_REFRESH_CUSTOMER = "EVT_REFRESH_CUSTOMER";
    return GameEvents;
}());
egret.registerClass(GameEvents,'GameEvents');
//# sourceMappingURL=GameEvents.js.map