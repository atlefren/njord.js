var N = this.N || {};

(function (ns) {
    'use strict';

    function mapGeoJSONCoords(coordinates) {
        return _.map(coordinates, function (coords) {
            return {x: coords[0], y: coords[1]};
        });
    }

    ns.Geometry = ns.Base.extend({

        initialize: function (data) {
            if (_.isObject(data)) {
                this.parseGeoJson(data);
            } else if (_.isString(data)) {
                this.parseGeoJson(JSON.parse(data));
            }
        },
        parseGeoJson: function (data) {
            if (data.type === "Point") {
                this.initialize({
                    x: data.coordinates[0],
                    y: data.coordinates[1]
                });
            } else if (data.type === "LineString") {
                this.initialize(mapGeoJSONCoords(data.coordinates));
            } else if (data.type === "Polygon") {
                var rings = _.map(data.coordinates, mapGeoJSONCoords);
                this.initialize.apply(this, rings);
            }
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