var N = this.N || {};

(function (ns) {
    'use strict';

    ns.Geometry = ns.Base.extend({

        initialize: function (coords) {
            this.coords = coords;
        },

        type: function () {
            return this.geom_type;
        },

        length: function () {
            return 0;
        },

        area: function () {
            return 0;
        },

        bounds: function () {
            //always overridden
        },

        repr: function () {
            //always overridden
        },

        distance: function (other) {
            //always overridden
        }

    });

}(N));