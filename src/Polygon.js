var N = this.N || {};

(function (ns) {
    'use strict';

    function coordsEquals(c1, c2) {
        return (c1.x === c2.x && c1.y === c2.x);
    }

    function fixRing(coords) {
        if (!coordsEquals(_.first(coords), _.last(coords))) {
            coords.push(_.clone(_.first(coords)));
        }

        if (coords.length < 3) {
            throw new Error("Polygon must have at least 3 points");
        }
        return coords;

    }

    //works only for clockwise polys..
    function areaOfRing(ring) {
        return Math.abs(
            _.reduce(ring, function (sum, p1, index, coords) {
                if (index < coords.length - 1) {
                    var p2 = coords[index + 1];
                    return sum + (p1.x + p2.x) * (p2.y - p1.y);
                }
                return sum;
            }, 0) / 2
        );
    }

    function parsePolyWkt(string) {
        var substring1 = string.substring(
            string.indexOf('(') + 1,
            string.indexOf(')')
        );
        var arr = [substring1];
        if (string.indexOf(')') + 1 < string.length) {
            arr = arr.concat(parsePolyWkt(
                string.substring(string.indexOf(')') + 1, string.length)
            ));
        }
        return arr;
    }

    ns.Polygon = ns.LineString.extend({
        geom_type: 'Polygon',

        initialize: function (shell, holes) {
            if (_.isArray(shell)) {
                this.coords = fixRing(shell);

                if (holes && holes.length) {
                    this.holes = _.map(holes, fixRing);
                }

            } else {
                ns.Geometry.prototype.initialize.apply(this, arguments);
            }
        },

        initFromWktSubstring: function (substring) {
            var arr = parsePolyWkt(substring);
            var outer = this.parseWktSubstring(arr[0]);
            var holes = _.map(_.rest(arr), this.parseWktSubstring);
            this.initialize(outer, holes);
        },

        area: function () {
            var area = areaOfRing(this.coords);
            if (this.holes) {
                area -= _.reduce(this.holes, function (sum, hole) {
                    return areaOfRing(hole);
                }, 0);
            }
            return area;
        },

        repr: function () {
            //TODO: does not work with "strange" polys
            var bounds = this.bounds();
            var x = bounds.left + (bounds.right - bounds.left) / 2;
            var y = bounds.bottom + (bounds.top - bounds.bottom) / 2;
            return new ns.Point({x: x, y: y});
        },

        geoJSONCoords: function () {
            var coords = [this.ringAsGeoJSONCoords(this.coords)];

            if (this.holes) {
                coords = coords.concat(
                    _.map(this.holes, this.ringAsGeoJSONCoords)
                );
            }
            return coords;
        },

        ringAsWktCoordString: function (ring) {
            var str = ns.LineString.prototype.ringAsWktCoordString.apply(
                this,
                arguments
            );
            return '(' + str + ')';
        },

        getWktCoordString: function () {
            var wktStrings = [this.ringAsWktCoordString(this.coords)];

            if (this.holes) {
                wktStrings = wktStrings.concat(
                    _.map(this.holes, this.ringAsWktCoordString)
                );
            }

            return wktStrings.join(', ');
        }
    });

}(N));