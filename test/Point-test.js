(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('Point test', {

        'N.point should be defined': function () {
            var point = new N.Point({x: 1, y: 2});
            assert(point);
        },

        'Should return correct geom type': function () {
            var point = new N.Point({x: 1, y: 2});
            assert.equals(point.type(), 'Point');
        },

        'should be able to get x and y': function () {
            var point1 = new N.Point({x: 1, y: 2});
            assert.equals(point1.x, 1);
            assert.equals(point1.y, 2);
        },

        'Should have length of zero': function () {
            var point = new N.Point({x: 1, y: 2});
            assert.equals(point.length(), 0);
        },

        'Should have area of zero': function () {
            var point = new N.Point({x: 1, y: 2});
            assert.equals(point.area(), 0);
        },

        'Should get correct bounds': function () {
            var point = new N.Point({x: 1, y: 2});
            var bounds = point.bounds();
            assert.equals(bounds.top, 2);
            assert.equals(bounds.left, 1);
            assert.equals(bounds.right, 1);
            assert.equals(bounds.bottom, 2);
        },

        'Should get representative point': function () {
            var point = new N.Point({x: 1, y: 2});
            var repPoint = point.repr();
            assert.equals(repPoint.coords.x, 1);
            assert.equals(repPoint.coords.y, 2);
            refute.equals(point, repPoint);
        },

        'Should get distance to another point': function () {
            var point1 = new N.Point({x: 1, y: 2});
            var point2 = new N.Point({x: 10, y: 20});
            assert.equals(point1.distance(point2), 20.12461179749811);
        },

        'should get distance to a LineString': function () {
            var point = new N.Point({x: 10, y: 20});
            var lineString = new N.LineString([
                {x: 1, y: 2},
                {x: 3, y: 4}
            ]);
            assert.equals(point.distance(lineString), 17.46424919657298);
        }

    });
}());
