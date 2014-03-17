(function () {
    "use strict";

    var assert = assert || buster.assertions.assert;
    var refute = refute || buster.assertions.refute;

    buster.testCase('Point test', {

        "N.point should be defined": function () {

            var geom1 = new N.Point({x: 1, y: 1});

            assert(geom1);

        }
    });
}());
