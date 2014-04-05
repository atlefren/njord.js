(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('WKT parse test', {

        'should be able to write a point to wkt': function () {
            var wkt = 'POINT (1.1 2.1)';
            var point = new N.Point(wkt);
            assert.equals(point.wkt(), wkt);
        },

        'should be able to write a linestring to wkt': function () {
            var wkt = 'LINESTRING (1.1 2.1, 3.1 4.1)';
            var line = new N.LineString(wkt);
            assert.equals(line.wkt(), wkt);
        },

        'should be able to write a polygon to wkt': function () {
            var wkt = 'POLYGON ((1.1 1.1, 1.1 2.1, 2.1 2.1, 2.1 1.1, 1.1 1.1))';
            var poly = new N.Polygon(wkt);
            assert.equals(poly.wkt(), wkt);
        },

        'should be able to write a polygon with holeto wkt': function () {
            var wkt = 'POLYGON ((1.1 1.1, 10.1 1.1, 10.1 10.1, 1.1 10.1, 1.1 1.1), (2.1 2.1, 3.1 2.1, 3.1 3.1, 2.1 3.1, 2.1 2.1))';
            var poly = new N.Polygon(wkt);
            assert.equals(poly.wkt(), wkt);
        }
    });
}());