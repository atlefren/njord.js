(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('GeoJSON parse test', {

        'should be able to create a point from a geojson geom object': function () {

            var geojson = {
                "type": "Point",
                "coordinates": [1, 2]
            };

            var point = new N.Point(geojson);
            assert.equals(point.type(), 'Point');
            assert(point instanceof N.Point);
            assert.equals(point.x, 1);
            assert.equals(point.y, 2);
        },

        'should be able to create a point from a geojson geom string': function () {

            var geojson = {
                "type": "Point",
                "coordinates": [1, 2]
            };

            var point = new N.Point(JSON.stringify(geojson));
            assert.equals(point.type(), 'Point');
            assert(point instanceof N.Point);
            assert.equals(point.x, 1);
            assert.equals(point.y, 2);

        },

        '//should be able to create a point from a geojson geom object using Geometry class': function () {

            var geojson = {
                "type": "Point",
                "coordinates": [1, 2]
            };

            var point = new N.Geometry(geojson);
            assert.equals(point.type(), 'Point');
            assert(point instanceof N.Point);
            assert.equals(point.x, 1);
            assert.equals(point.y, 2);
        },

        'should be able to create a LineString from a geojson geom object': function () {

            var geojson = {
                "type": "LineString",
                "coordinates": [ [1, 2], [3, 4] ]
            };

            var line = new N.LineString(geojson);
            assert.equals(line.type(), 'LineString');
            assert(line instanceof N.LineString);
            assert(line.coords);
            assert.equals(line.coords.length, 2);
            assert.equals(line.coords[0].x, 1);
            assert.equals(line.coords[0].y, 2);
            assert.equals(line.coords[1].x, 3);
            assert.equals(line.coords[1].y, 4);

        },

        'should be able to create a linestring from a geojson geom string': function () {

            var geojson = {
                "type": "LineString",
                "coordinates": [ [1, 2], [3, 4] ]
            };

            var line = new N.LineString(JSON.stringify(geojson));
            assert.equals(line.type(), 'LineString');
            assert(line instanceof N.LineString);
            assert(line.coords);
            assert.equals(line.coords.length, 2);
            assert.equals(line.coords[0].x, 1);
            assert.equals(line.coords[0].y, 2);
            assert.equals(line.coords[1].x, 3);
            assert.equals(line.coords[1].y, 4);
        },

        'should be able to create a Polygon from a geojson geom object': function () {

            var geojson = {
                "type": "Polygon",
                "coordinates": [
                    [
                        [1, 1],
                        [1, 2],
                        [2, 2],
                        [2, 1]
                    ]
                ]
            };

            var poly = new N.Polygon(geojson);
            assert.equals(poly.type(), 'Polygon');
            assert(poly instanceof N.Polygon);
            assert(poly.coords);
            assert.equals(poly.coords.length, 5);
            var bounds = poly.bounds();
            assert.equals(bounds.top, 2);
            assert.equals(bounds.left, 1);
            assert.equals(bounds.right, 2);
            assert.equals(bounds.bottom, 1);
        },

        'should be able to create a polygon from a geojson geom string': function () {

            var geojson = {
                "type": "Polygon",
                "coordinates": [
                    [
                        [1, 1],
                        [1, 2],
                        [2, 2],
                        [2, 1]
                    ]
                ]
            };

            var poly = new N.Polygon(JSON.stringify(geojson));
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