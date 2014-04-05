(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('WKT parse test', {

        'should be able to parse WKT point': function () {
            var wkt = 'POINT (1.0 2.0)';
            var point = new N.Point(wkt);
            assert.equals(point.type(), 'Point');
            assert(point instanceof N.Point);
            assert.equals(point.x, 1.0);
            assert.equals(point.y, 2.0);
        },

        'should be able to parse WKT LineString': function () {
            var wkt = 'LINESTRING (1.0 2.0, 3.0 4.0)';
            var line = new N.LineString(wkt);
            assert.equals(line.type(), 'LineString');
            assert(line instanceof N.LineString);
            assert(line.coords);
            assert.equals(line.coords.length, 2);
            assert.equals(line.coords[0].x, 1.0);
            assert.equals(line.coords[0].y, 2.0);
            assert.equals(line.coords[1].x, 3.0);
            assert.equals(line.coords[1].y, 4.0);
        },

        'should be able to parse WKT Polygon': function () {
            var wkt = 'POLYGON ((1.0 1.0, 1.0 2.0, 2.0 2.0, 2.0 1.0, 1.0 1.0))';
            var poly = new N.Polygon(wkt);
            assert.equals(poly.type(), 'Polygon');
            assert(poly instanceof N.Polygon);
            assert(poly.coords);
            assert.equals(poly.coords.length, 5);
            var bounds = poly.bounds();
            assert.equals(bounds.top, 2);
            assert.equals(bounds.left, 1);
            assert.equals(bounds.right, 2);
            assert.equals(bounds.bottom, 1);
        }

    });
}());