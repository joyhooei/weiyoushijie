var Dao = (function (_super) {
    __extends(Dao, _super);
    function Dao(baseUrl, gameName) {
        _super.call(this);
        this._baseUrl = baseUrl;
        this._gameName = gameName;
    }
    var d = __define,c=Dao,p=c.prototype;
    p.fetch = function (model, conditions, filters, cb) {
        if (conditions) {
            conditions["game"] = this._gameName;
        }
        else {
            conditions = { game: this._gameName };
        }
        this.rest("select/" + model, { conditions: conditions, filters: filters }, cb);
    };
    p.save = function (model, data, cb) {
        var self = this;
        var _cb = function (succeed, result) {
            if (succeed) {
                data = result;
            }
            self.dispatchEventWith(model, true, data);
            if (cb) {
                cb(succeed, result);
            }
        };
        data.game = this._gameName;
        if (data.id) {
            this.rest("update/" + model + "/" + data.id, data, _cb);
        }
        else {
            this.rest("create/" + model, data, _cb);
        }
    };
    p.rest = function (method, data, cb) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open(this._baseUrl + method + "?game=" + this._gameName, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, function (evt) {
            var request = evt.currentTarget;
            console.log("post data : ", request.response);
            if (cb) {
                cb(true, JSON.parse(request.response));
            }
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (evt) {
            if (cb) {
                cb(false, event);
            }
        }, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, function (evt) {
            console.log("post progress : " + Math.floor(100 * evt.bytesLoaded / evt.bytesTotal) + "%");
        }, this);
        request.send(JSON.stringify(data));
    };
    return Dao;
}(egret.EventDispatcher));
egret.registerClass(Dao,'Dao');
