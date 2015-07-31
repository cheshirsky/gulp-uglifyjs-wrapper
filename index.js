'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var uglify = require('uglify-js');
var deap = require('deap');
var path = require('path');

function normalise(options) {
    return deap({
        fromString: true,
        output: {
            comments: /^!|@preserve|@license|@cc_on/i
        }
    }, options);
}

function createError(err) {
    err = err || "Unknown Error";
    return new gutil.PluginError('gulp-uglifyjs-wrapper', err);
}

module.exports = function (options) {
    options = normalise(options);

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) return cb(null, file);
        if (file.isStream()) return cb(createError('Streaming not supported'));

        var mapPrefix = ".map";
        try {
            var minified = uglify.minify(String(file.contents), options);
            file.contents = new Buffer(minified.code);
            file.sourceMap = minified.map ? minified.map : file.sourceMap;
            this.push(file);

            if (!options.outSourceMap) return cb();
            var mapsFile = new gutil.File({
                contents: new Buffer(minified.map),
                path:  typeof options.outSourceMap === 'string' ? options.outSourceMap : path.basename(file.path) + mapPrefix
            });
            this.push(mapsFile);
        } catch (err) {
            this.emit('error', createError(err));
        }
        cb();
    });
};
