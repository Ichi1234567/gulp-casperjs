/*
 * grunt-casperjs
 * https://github.com/ronaldlokers/grunt-casperjs
 *
 * Copyright (c) 2013 Ronald Lokers
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var spawn = require('child_process').spawn;
var casperjs = require('./tasks/lib/casperjs').init(gutil).casperjs;

module.exports = function(options) {
  var firstFile;
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-zip', 'Streaming not supported'));
      return cb();
    }

    if (!firstFile) {
      firstFile = file;
    }

    // Because Windows...
    var pathname = file.relative.replace(/\\/g, '/');

    casperjs(file.path, options, function(err) {
      if (err) {
        //grunt.warn(err);
        console.log(err);
      }
      cb();
    });
    cb();
  }, function(cb) {
    if (!firstFile) {
      return cb();
    }
    cb();
  });
};
