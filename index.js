'use strict';

var registryUrl = require('registry-url')(),
    got = require('got'),
    MdAst = require('mdast'),
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

  var mdast = MdAst;

  got(registryUrl + name, { json: true }, function (err, pkg) {
    if (err) return cb(err);

    if (opts.man) {
      mdast = mdast.use(mdastStripBadges)
        .use(mdastMan, {
          section: 'npm',
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
          date: pkg.time.modified
        });
    }

    cb(err, mdast.process(pkg.readme));
  });
};
