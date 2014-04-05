(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('GeoJSON write test', {

        'can read and write a geoJSON point': function () {
            var geojson = {
                "type": "Point",
                "coordinates": [1, 2]
            };

            var point = new N.Point(geojson);
            assert.equals(point.json(), geojson);
        },

        'can read and write a geoJSON LineString': function () {

            var geojson = {
                "type": "LineString",
                "coordinates": [ [1, 2], [3, 4] ]
            };

            var line = new N.LineString(geojson);
            assert.equals(line.json(), geojson);
        },

        'can read and write a geoJSON Polygon': function () {

            var geojson = {
                "type": "Polygon",
                "coordinates": [
                    [
                        [1, 1],
                        [1, 2],
                        [2, 2],
                        [2, 1],
                        [1, 1]
                    ]
                ]
            };

            var poly = new N.Polygon(geojson);
            assert.equals(poly.json(), geojson);
        },

        'can read and write a geoJSON Polygon with hole': function () {

            var geojson = {
                "type": "Polygon",
                "coordinates": [
                    [
                        [1, 1],
                        [1, 10],
                        [10, 10],
                        [10, 1],
                        [1, 1]
                    ],
                    [
                        [2, 2],
                        [2, 3],
                        [3, 3],
                        [3, 2],
                        [2, 2]
                    ]
                ]
            };

            var poly = new N.Polygon(geojson);
            assert.equals(poly.json(), geojson);
        }

    });
}());