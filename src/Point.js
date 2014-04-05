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

        initFromWktSubstring: function (wkt_substring) {
            var coords = wkt_substring.split(" ");

            this.initialize({
                x: parseFloat(coords[0]),
                y: parseFloat(coords[1])
            });
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
        },

        geoJSONCoords: function () {
            return [this.x, this.y];
        },

        getWktCoordString: function () {
            return _.template('<%= x %> <%= y %>', this.coords);
        }
    });

}(N));