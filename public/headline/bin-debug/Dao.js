var Dao = (function (_super) {
    __extends(Dao, _super);
    function Dao(url, game) {
        _super.call(this);
        this._url = url;
        this._game = game;
    }
    var d = __define,c=Dao,p=c.prototype;
    p.fetch = function (model, conditions, filters) {
        conditions = conditions || {};
        conditions["game"] = this._game;
        filters = filters || {};
        return this.rest("select/" + model, { conditions: conditions, filters: filters });
    };
    p.save = function (model, data) {
        var self = this;
        data.game = this._game;
        if (data.id) {
            var promise = this.rest("update/" + model + "/" + data.id, data);
        }
        else {
            var promise = this.rest("create/" + model, data);
        }
        promise.then(function (d) {
            data = d;
            self.dispatchEventWith(model, true, data);
        }, function (error) {
            Toast.launch(error);
        });
        return promise;
    };
    p.rest = function (method, data) {
        return this.restWithUrl(this._url + method + "?game=" + this._game + "&token=" + application.token, data);
    };
    p.restWithUrl = function (url, data) {
        var self = this;
        return Q.Promise(function (resolve, reject, notify) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            //设置为 POST 请求
            request.open(url, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, function (evt) {
                var request = evt.currentTarget;
                resolve(JSON.parse(request.response));
            }, self);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (evt) {
                console.error('restWithUrl ' + url + ' failed ' + evt.$target.response);
                reject(evt.$target.response);
            }, self);
            request.addEventListener(egret.ProgressEvent.PROGRESS, function (evt) {
                notify(Math.floor(100 * evt.bytesLoaded / evt.bytesTotal));
            }, self);
            request.send(JSON.stringify(data));
        });
    };
    return Dao;
}(egret.EventDispatcher));
egret.registerClass(Dao,'Dao');
