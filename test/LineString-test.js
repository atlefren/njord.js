(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('LineString test', {

        setUp: function () {
            this.line1 = new N.LineString([
                {x: 1, y: 2},
                {x: 3, y: 4}
            ]);

            this.longLine = new N.LineString([
                {x: 1, y: 2},
                {x: 3, y: 4},
                {x: 5, y: 6},
                {x: 7, y: 8},
                {x: 9, y: 10},
                {x: 11, y: 12}
            ]);
        },

        'N.LineString should be defined': function () {
            assert(this.line1);
        },

        'Should return correct geom type': function () {
            assert.equals(this.line1.type(), 'LineString');
        },

        'should have coords': function () {
            assert(this.line1.coords);
            assert.equals(this.line1.coords.length, 2);
            assert.equals(this.line1.coords[0].x, 1);
            assert.equals(this.line1.coords[0].y, 2);
            assert.equals(this.line1.coords[1].x, 3);
            assert.equals(this.line1.coords[1].y, 4);
        },

        'Should get correct length with two points': function () {
            assert.equals(this.line1.length(), 2.8284271247461903);
        },

        'Should get correct length with more points': function () {
            assert.equals(this.longLine.length(), 14.142135623730951);
        },

        'Should have area of zero': function () {
            assert.equals(this.line1.area(), 0);
        },

        'Should get correct bounds with two points': function () {
            var bounds = this.line1.bounds();
            assert.equals(bounds.top, 4);
            assert.equals(bounds.left, 1);
            assert.equals(bounds.right, 3);
            assert.equals(bounds.bottom, 2);
        },

        'Should get correct bounds with more points': function () {
            var bounds = this.longLine.bounds();
            assert.equals(bounds.top, 12);
            assert.equals(bounds.left, 1);
            assert.equals(bounds.right, 11);
            assert.equals(bounds.bottom, 2);
        },

        'Should get representative point': function () {
            var repPoint = this.line1.repr();
            assert(repPoint instanceof N.Point);
            assert.equals(repPoint.x, 1);
            assert.equals(repPoint.y, 2);
        },

        'Should get distance to  point': function () {
            var point1 = new N.Point({x: 10, y: 20});
            assert.equals(this.line1.distance(point1), 17.46424919657298);
        },

        'Should get distance to line not from vertex': function () {
            var line = new N.LineString([
                {x: 1, y: 1},
                {x: 1, y: 5}
            ]);
            var point = new N.Point({x: 3, y: 3});
            assert.equals(line.distance(point), 2);
        },

        'Should get distance to line with many segments not from vertex': function () {
            var line = new N.LineString([
                {x: 1, y: 1},
                {x: 1, y: 4},
                {x: 4, y: 4}
            ]);
            var point = new N.Point({x: 3, y: 3});
            assert.equals(line.distance(point), 1);
        },

        'Should get distance to line with more segments not from vertex': function () {
            var line = new N.LineString([
                {x: 1, y: 1},
                {x: 1, y: 4},
                {x: 4, y: 4},
                {x: 3, y: 4}
            ]);
            var point = new N.Point({x: 3, y: 3});
            assert.equals(line.distance(point), 1);
        },

        'Should get distance of zero': function () {
            var line = new N.LineString([
                {x: 1, y: 1},
                {x: 1, y: 4},
                {x: 4, y: 4},
                {x: 3, y: 4}
            ]);
            var point = new N.Point({x: 1, y: 2});
            assert.equals(line.distance(point), 0);
        },

        'Should get distance to another linestring': function () {
            var line1 = new N.LineString([
                {x: 1, y: 1},
                {x: 4, y: 1}
            ]);

            var line2 = new N.LineString([
                {x: 1, y: 4},
                {x: 4, y: 4}
            ]);

            assert.equals(line1.distance(line2), 3);
        },

        'Should get more complex distance to another linestring': function () {
            var line1 = new N.LineString([
                {x: 1, y: 1},
                {x: 3, y: 1},
                {x: 4, y: 2},
                {x: 5, y: 2},
                {x: 6, y: 3}
            ]);

            var line2 = new N.LineString([
                {x: 1, y: 3},
                {x: 3, y: 3},
                {x: 3, y: 2},
                {x: 4, y: 3}
            ]);
            assert.equals(line1.distance(line2), 0.7071067811865476);
        }
    });
}());
