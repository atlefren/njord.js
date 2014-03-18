(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('LineString test', {

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
        }
    });
}());

