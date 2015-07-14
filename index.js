'use strict';

var registryUrl = require('registry-url')(),
    got = require('got'),
    readmeToManPage = require('readme-to-man-page');


module.exports = function (name, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  if (opts.man == null) {
    opts.man = true;
  }

  got(registryUrl + name, { json: true }, function (err, pkg) {
    if (err) return cb(err);
    cb(err, opts.man ? readmeToManPage(pkg) : pkg.readme);
  });
};
