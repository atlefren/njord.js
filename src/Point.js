var N = this.N || {};

(function (ns) {
    'use strict';

    ns.Point = ns.Geometry.extend({

        geom_type: 'Point',

        initialize: function (coords) {
            if (_.isObject(coords) && _.has(coords, "x") && _.has(coords, "y")) {
                this.x = coords.x;
                this.y = coords.y;
                this.coords = coords;
            } else {
                ns.Geometry.prototype.initialize.apply(this, arguments);
            }
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
                return ns.distance.pointToPoint(this, other);
            }
            if (other.type() === 'LineString') {
                return other.distance(this);
            }
        }
    });

}(N));