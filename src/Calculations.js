var N = this.N || {};

(function (ns) {
    'use strict';

    ns.distance = {};
    (function (ns) {

        function sqr(x) {
            return x * x;
        }
        function distance(p1, p2) {
            return sqr(p1.x - p2.x) + sqr(p1.y - p2.y);
        }

        function distToSegmentSquared(point, segment) {
            var v = segment[0];
            var w = segment[1];
            var l2 = distance(v, w);
            if (l2 === 0) {
                return distance(point, v);
            }
            var t = ((point.x - v.x) * (w.x - v.x) +
                (point.y - v.y) * (w.y - v.y)) / l2;
            if (t < 0) {
                return distance(point, v);
            }
            if (t > 1) {
                return distance(point, w);
            }
            return distance(
                point,
                {
                    x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y)
                }
            );
        }

        ns.pointToPoint = function (p1, p2) {
            return Math.sqrt(distance(p1, p2));
        };

        ns.pointToSegment = function (point, segment) {
            return Math.sqrt(distToSegmentSquared(point, segment));
        };

    }(ns.distance));

}(N));