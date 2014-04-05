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
                try {
                    this.parseGeoJson(JSON.parse(data));
                } catch (SyntaxError) {
                    this.checkParseWkt(data);
                }
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
                this.initialize(rings[0], _.rest(rings));
            }
        },

        checkParseWkt: function (wkt) {
            var type = wkt.split(/ (.+)?/)[0];
            if (type === this.geom_type.toUpperCase()) {
                var substring = wkt.substring(
                    wkt.indexOf('(') + 1,
                    wkt.lastIndexOf(')')
                );
                this.initFromWktSubstring(substring);
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
        },

        json: function () {
            return {
                type: this.geom_type,
                coordinates: this.geoJSONCoords()
            };
        },

        wkt: function () {
            return _.template(
                '<%=type %> (<%= coords %>)',
                {
                    type: this.geom_type.toUpperCase(),
                    coords: this.getWktCoordString()
                }
            );
        },

        geoJSONCoords: function () {
            //always overridden
        }

    });

}(N));