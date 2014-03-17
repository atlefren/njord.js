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
                var x0 = this.x;
                var y0 = this.y;
                var x1 = other.x;
                var y1 = other.y;
                return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
            }
        }
    });

}(N));