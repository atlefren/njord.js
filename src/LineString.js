var N = this.N || {};

(function (ns) {
    'use strict';

    function getClosestSegments(point, coords) {
        var vertexDistances = _.map(coords, function (coord) {
            return ns.distance.pointToPoint(coord, point);
        });
        var closestVertex = _.indexOf(vertexDistances, _.min(vertexDistances));
        var segments = [];
        if (closestVertex + 1 < coords.length) {
            segments.push([
                coords[closestVertex],
                coords[closestVertex + 1]
            ]);
        }
        if (closestVertex - 1 >= 0) {
            segments.push([
                coords[closestVertex - 1],
                coords[closestVertex]
            ]);
        }
        return segments;
    }

    function distancePointToLine(point, line) {
        var segments = getClosestSegments(point, line);
        return _.min(_.map(segments, function (segment) {
            return ns.distance.pointToSegment(point, segment);
        }));
    }

    ns.LineString = ns.Geometry.extend({

        geom_type: 'LineString',

        length: function () {
            return _.reduce(this.coords, function (res, coord, index, arr) {
                if (index < arr.length - 1) {
                    res += ns.distance.pointToPoint(coord, arr[index + 1]);
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
                return distancePointToLine(other, this.coords);
            }

            if (other.type() === 'LineString') {
                return _.min(_.map(this.coords, function (point) {
                    return distancePointToLine(point, other.coords);
                }));
            }
        }
    });

}(N));