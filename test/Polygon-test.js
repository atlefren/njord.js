(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('Polygon test', {

        setUp: function () {
            this.poly = new N.Polygon([
                {x: 1, y: 1},
                {x: 1, y: 2},
                {x: 2, y: 2},
                {x: 2, y: 1},
                {x: 1, y: 1}
            ]);
        },

        'N.Polygon should be defined': function () {
            assert(this.poly);
        },

        'Should have correct type': function () {
            assert.equals(this.poly.type(), "Polygon");
        },

        'Should get correct length': function () {
            assert.equals(this.poly.length(), 4);
        },

        'Should get correct Area': function () {
            assert.equals(this.poly.area(), 1);
        },

        'should handle missing last point': function () {
            var poly = new N.Polygon([
                {x: 1, y: 1},
                {x: 1, y: 2},
                {x: 2, y: 2},
                {x: 2, y: 1}
            ]);
            assert.equals(poly.length(), 4);
        },

        'should throw error when less than 3 points': function () {
            assert.exception(function () {
                var p = new N.Polygon([
                    {x: 1, y: 1},
                    {x: 1, y: 2}
                ]);
            });
        },

        'should get bounds': function () {
            var bounds = this.poly.bounds();
            assert.equals(bounds.top, 2);
            assert.equals(bounds.left, 1);
            assert.equals(bounds.right, 2);
            assert.equals(bounds.bottom, 1);
        },

        'should get representative point': function () {
            var repPoint = this.poly.repr();
            assert(repPoint instanceof N.Point);
            assert.equals(repPoint.x, 1.5);
            assert.equals(repPoint.y, 1.5);
        },

        'should get representative point again': function () {
            var poly = new N.Polygon([
                {x: 1, y: 1},
                {x: -1, y: 1},
                {x: -1, y: -1},
                {x: 1, y: -1}
            ]);
            var repPoint = poly.repr();
            assert(repPoint instanceof N.Point);
            assert.equals(repPoint.x, 0);
            assert.equals(repPoint.y, 0);
        },

        'should handle polygons with holes': function () {

            var outer = [
                {x: 1, y: 1},
                {x: 1, y: 10},
                {x: 10, y: 10},
                {x: 10, y: 1}
            ];

            var ring1 = [
                {x: 2, y: 2},
                {x: 2, y: 3},
                {x: 3, y: 3},
                {x: 3, y: 2}
            ];

            var poly = new N.Polygon(outer, [ring1]);
            assert.equals(poly.coords.length, 5);
            assert.equals(poly.holes.length, 1);
            assert.equals(poly.holes[0].length, 5);

            assert.equals(poly.area(), 80);
        },

        'should compute area ccw': function () {

            var outer = [
                {x: 1, y: 1},
                {x: 10, y: 1},
                {x: 10, y: 10},
                {x: 1, y: 10}
            ];

            var poly = new N.Polygon(outer);

            assert.equals(poly.area(), 81);
        },

        'should compute anoter area ccw': function () {

            var outer = [
                {x: 2, y: 2},
                {x: 8, y: 2},
                {x: 11, y: 3},
                {x: 11, y: 6},
                {x: 8, y: 10},
                {x: 6, y: 8},
                {x: 2, y: 8},
                {x: 4, y: 6},
                {x: 4, y: 4}
            ];

            var poly = new N.Polygon(outer);

            assert.equals(poly.area(), 46.5);
        }
    });
}());

