'use strict';

var registryUrl = require('registry-url')(),
    got = require('got'),
    mdast = require('mdast'),
    mdastMan = require('mdast-man'),
    mdastStripBadges = require('mdast-strip-badges'),
    npmExpansion = require('npm-expansion');


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

    var md = mdast();

    if (opts.man) {
      md = md.use(mdastStripBadges)
        .use(mdastMan, {
          section: 'npm',
          manual: npmExpansion(),
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
          date: pkg.time.modified
        });
    }

    cb(err, md.process(pkg.readme));
  });
};
