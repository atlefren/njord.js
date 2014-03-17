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