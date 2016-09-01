var Star = (function () {
    function Star() {
    }
    var d = __define,c=Star,p=c.prototype;
    Star.getUpgrade = function (price) {
        for (var i = 1; i <= application.star.opened_level; i++) {
            price = price * 0.01;
        }
        return price;
    };
    Star.exceed = function (star) {
        var now = new Date();
        var openTime = new Date(star.open_time);
        var deadline = openTime.getTime() + (star.opening_level + 3) * 24 * 3600000;
        var passed = now.getTime() + star.saving_hours * 3600000;
        return (deadline - passed) / 1000;
    };
    Star.check = function (star) {
        if (star.opening_level > 0) {
            if (Star.exceed(star) <= 0) {
                star.opened_level = star.opening_level;
                star.opening_level = 0;
                star.open_time = "";
                star.saving_hours = 0;
                application.dao.save("Star", star);
            }
        }
        return star;
    };
    Star.create = function (customer) {
        var star = {};
        star.customer_id = customer.attrs.id;
        star.opened_level = 0;
        star.opening_level = 0;
        star.open_time = "";
        star.saving_hours = 0;
        star.last_pick_time = (new Date()).toString();
        star.sticks = 0;
        return application.dao.save("Star", star);
    };
    Star.refresh = function (customer) {
        return Q.Promise(function (resolve, reject, notify) {
            application.dao.fetch("Star", { customer_id: customer.attrs.id }, { limit: 1 }).then(function (stars) {
                if (stars.length == 1) {
                    application.star = Star.check(stars[0]);
                    resolve(application.star);
                }
                else {
                    Star.create(customer).then(function (star) {
                        application.star = star;
                        resolve(application.star);
                    });
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    return Star;
}());
egret.registerClass(Star,'Star');
