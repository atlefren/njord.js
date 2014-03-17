(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('LineString test', {

        'N.LineString should be defined': function () {

            var lineString = new N.LineString([
                {x: 1, y: 1},
                {x: 2, y: 2}
            ]);

            assert(lineString);
        }
    });
}());
