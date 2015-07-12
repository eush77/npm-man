'use strict';

var mdast = require('mdast'),
    mdastMan = require('mdast-man');


module.exports = function (pkg) {
  return mdast
    .use(mdastMan, {
      section: 1,
      name: pkg.name,
      version: pkg.version,
      description: pkg.description
    })
    .process(pkg.readme);
};
