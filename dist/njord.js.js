var N = this.N || {};

/**
 * This is adopted from backbone.js which
 * is available for use under the MIT software license.
 * see http://github.com/jashkenas/backbone/blob/master/LICENSE
 */
(function (ns) {
    "use strict";

    ns.Base = function () {
        this.initialize.apply(this, arguments);
    };

    _.extend(ns.Base.prototype, {
        initialize: function () {}
    });

    ns.Base.extend = function (protoProps, staticProps) {
        var parent = this;
        var child;

        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () { return parent.apply(this, arguments); };
        }
        _.extend(child, parent, staticProps);
        var Surrogate = function () { this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();
        if (protoProps) {
            _.extend(child.prototype, protoProps);
        }
        child.__super__ = parent.prototype;

        return child;
    };

}(N));
var N = this.N || {};

(function (ns) {
    'use strict';

    ns.distance = function(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

}(N));
var N = this.N || {};

(function (ns) {
    'use strict';

    ns.Geometry = ns.Base.extend({

        initialize: function (coords) {
            this.coords = coords;
        },

        type: function () {
            return this.geom_type;
        },

        length: function () {
            return 0;
        },

        area: function () {
            return 0;
        },

        bounds: function () {
            //always overridden
        },

        repr: function () {
            //always overridden
        },

        distance: function (other) {
            //always overridden
        }

    });

}(N));
var N = this.N || {};

(function (ns) {
    'use strict';

    ns.Point = ns.Geometry.extend({

        geom_type: 'Point',

        initialize: function (coords) {
            ns.Geometry.prototype.initialize.apply(this, arguments);

            this.x = coords.x;
            this.y = coords.y;
        },

        bounds: function () {
            return {
                left: this.x,
                top: this.y,
                right: this.x,
                bottom: this.y
            };
        },

        repr: function () {
            return _.clone(this);
        },

        distance: function (other) {
            if (other.type() === 'Point') {
                return ns.distance(this, other);
            }
            if (other.type() === 'LineString') {
                return other.distance(this);
            }
        }
    });

}(N));
var N = this.N || {};

(function (ns) {
    'use strict';

    ns.LineString = ns.Geometry.extend({

        geom_type: 'LineString',

        length: function () {
            return _.reduce(this.coords, function (res, coord, index, arr) {
                if (index < arr.length - 1) {
                    res += ns.distance(coord, arr[index + 1]);
                }
                return res;
            }, 0);
        },

        bounds: function () {

            var xes = _.pluck(this.coords, 'x');
            var ys = _.pluck(this.coords, 'y');

            return {
                left:_.min(xes),
                top: _.max(ys),
                right: _.max(xes),
                bottom: _.min(ys)
            };

        },

        repr: function () {
            return new ns.Point(this.coords[0]);
        },

        distance: function (other) {
            if (other.type() === 'Point') {

                //TODO: this does only find distance from vertices
                return _.min(_.map(this.coords, function (coord) {
                    return ns.distance(coord, other);
                }));
            }
        }
    });

}(N));