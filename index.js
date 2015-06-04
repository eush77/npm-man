'use strict';

var registryUrl = require('registry-url')(),
    got = require('got');


module.exports = function (name, cb) {
  got(registryUrl + name, { json: true }, function (err, info) {
    if (err) return cb(err);
    cb(err, info.readme);
  });
};