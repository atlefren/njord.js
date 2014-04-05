var N = this.N || {};

(function (ns) {
    'use strict';

    function coordsEquals(c1, c2) {
        return (c1.x === c2.x && c1.y === c2.x);
    }

    ns.Polygon = ns.LineString.extend({
        geom_type: 'Polygon',

        initialize: function (coords) {
            if (_.isArray(coords)) {
                if (!coordsEquals(_.first(coords), _.last(coords))) {
                    coords.push(_.clone(_.first(coords)));
                }

                if (coords.length < 3) {
                    throw new Error("Polygon must have at least 3 points");
                }

                this.coords = coords;
            } else {
                ns.Geometry.prototype.initialize.apply(this, arguments);
            }
        },

        area: function () {
            return Math.abs(
                _.reduce(this.coords, function (sum, p1, index, coords) {
                    if (index < coords.length - 1) {
                        var p2 = coords[index + 1];
                        return sum + (p1.x + p2.x) * (p2.y - p1.y);
                    }
                    return sum;
                }, 0) / 2
            );
        },

        repr: function () {
            //TODO: does not work with "strange" polys
            var bounds = this.bounds();
            var x = bounds.left + (bounds.right - bounds.left) / 2;
            var y = bounds.bottom + (bounds.top - bounds.bottom) / 2;
            return new ns.Point({x: x, y: y});
        },

        geoJSONCoords: function () {
            return [ns.LineString.prototype.geoJSONCoords.apply(this, arguments)];
        }
    });

}(N));