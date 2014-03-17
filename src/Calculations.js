var N = this.N || {};

(function (ns) {
    'use strict';

    ns.distance = function(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

}(N));