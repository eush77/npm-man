'use strict';

var registryUrl = require('registry-url')(),
    got = require('got'),
    Mdast = require('mdast'),
    mdastMan = require('mdast-man'),
    mdastStripBadges = require('mdast-strip-badges');


module.exports = function (name, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  if (opts.man == null) {
    opts.man = true;
  }

  var mdast = Mdast.use(mdastStripBadges);

  got(registryUrl + name, { json: true }, function (err, pkg) {
    if (err) return cb(err);

    if (opts.man) {
      mdast = mdast.use(mdastMan, {
        section: 1,
        name: pkg.name,
        version: pkg.version,
        description: pkg.description
      });
    }

    cb(err, mdast.process(pkg.readme));
  });
};
