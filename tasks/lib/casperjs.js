var path = require('path')
var spawn = require('child_process').spawn;

exports.init = function(gutil) {
  var exports = {};

  exports.casperjs = function(filepath, options, callback) {

    var command = path.join(__dirname, '..', '..', 'casperjs'),
        args = ['test'],
        phantomBinPath = require('phantomjs').path;

    if (options.casperjsOptions && options.casperjsOptions.length > 0) {
        args = args.concat(options.casperjsOptions);
    }

    args.push(filepath);

    gutil.log("Command: " + command);

    process.env["PHANTOMJS_EXECUTABLE"] = phantomBinPath;

    gutil.log('\nRunning tests from "' + filepath + '":\n');

    var casperChild = spawn(command, args);
    casperChild.stdout.on('data', function (data) {
      gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });

    casperChild.on('close', function (code) {
      var success = code === 0; // Will be 1 in the event of failure

      // Do something with success here
    });
  };

  return exports;
};
