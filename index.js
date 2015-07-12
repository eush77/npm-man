'use strict';

var makeMan = require('./lib/make-man');

var registryUrl = require('registry-url')(),
    got = require('got');


module.exports = function (name, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  if (opts.man == null) {
    opts.man = true;
  }

  got(registryUrl + name, { json: true }, function (err, info) {
    if (err) return cb(err);
    var man = opts.man ? makeMan(info) : info.readme;
    cb(err, man);
  });
};
