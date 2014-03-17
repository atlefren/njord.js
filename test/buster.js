var config = module.exports;
var fs = require('fs');

config['Njord Browser tests'] = {
    env: 'browser',
    rootPath: '../',
    libs: [
        'lib/*.js'
    ],
    sources: [
        'src/class_system.js',
        'src/Calculations.js',
        'src/Geometry.js',
        'src/Point.js',
        'src/LineString.js'
    ],
    tests: [
        'test/*-test.js'
    ]
};

