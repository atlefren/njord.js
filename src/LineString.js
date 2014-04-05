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

    function segmentsCross(segment1, segment2) {

        var x1 = segment1[0].x;
        var y1 = segment1[0].y;

        var x2 = segment1[1].x;
        var y2 = segment1[1].y;

        var x3 = segment2[0].x;
        var y3 = segment2[0].y;

        var x4 = segment2[1].x;
        var y4 = segment2[1].y;

        var denominator = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));

        if (denominator === 0) {
            return false;
        }
        var numeratorX = (((x1 * y2) - (y1 * x2)) * (x3 - x4)) - ((x1 - x2) * ((x3 * y4) - (y3 * x4)));
        var numeratorY = (((x1 * y2) - (y1 * x2)) * (y3 - y4)) - ((y1 - y2) * ((x3 * y4) - (y3 * x4)));

        var x = numeratorX / denominator;
        var y = numeratorY / denominator;

        var dist = distancePointToLine({x: x, y: y}, segment1);
        var dist2 = distancePointToLine({x: x, y: y}, segment2);
        return (dist === 0 && dist2 === 0);
    }

    function lineCrossesSegment(line, segment) {
        return _.find(line.coords, function (coord, index, arr) {
            if (index < arr.length - 1) {
                //res += ns.distance.pointToPoint(coord, arr[index + 1]);

                return segmentsCross([coord, arr[index + 1]], segment);
            }
            return false;
        });
    }

    ns.LineString = ns.Geometry.extend({

        geom_type: 'LineString',

        initialize: function (coords) {
            if (_.isArray(coords)) {

                if (coords.length < 2) {
                    throw new Error(
                        "LineString must have at least two points!"
                    );
                }
                this.coords = coords;
            } else {
                ns.Geometry.prototype.initialize.apply(this, arguments);
            }
        },

        parseWktSubstring: function (substring) {
            return _.map(substring.split(','), function (coords) {
                coords = _.without(coords.split(' '), '');
                return {
                    x: parseFloat(coords[0]),
                    y: parseFloat(coords[1])
                };
            });
        },

        initFromWktSubstring: function (substring) {
            this.initialize(this.parseWktSubstring(substring));
        },

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
                return _.chain(this.coords)
                    .map(function (p1, index, coords) {
                        if (index + 1 < coords.length) {
                            return distancePointToLine(
                                other,
                                [p1, coords[index + 1]]
                            );
                        }
                        return false;
                    })
                    .without(false)
                    .min()
                    .value();
            }

            if (other.type() === 'LineString') {

                if (this.crosses(other)) {
                    return 0;
                }

                return _.min(_.map(this.coords, function (point) {
                    return distancePointToLine(point, other.coords);
                }));
            }

            return false;
        },

        crosses: function (other) {

            if (other.type() !== 'LineString') {
                throw new Error("Can only check crossing with other point");
            }

            return _.find(this.coords, function (coord, index, arr) {
                if (index < arr.length - 1) {
                    return lineCrossesSegment(other, [coord, arr[index + 1]]);
                }
                return false;
            });
        },

        geoJSONCoords: function () {
            return _.map(this.coords, function (coord) {
                return [coord.x, coord.y];
            });
        }

    });

}(N));