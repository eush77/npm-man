'use strict';

var registryUrl = require('registry-url')(),
    got = require('got'),
    readmeToManPage = require('readme-to-man-page'),
    npmExpansion = require('npm-expansion');


module.exports = function (name, cb) {
  got(registryUrl + name, { json: true }, function (err, pkg) {
    if (err) return cb(err);
    cb(null, manPage(pkg));
  });
};


function manPage (pkg) {
  return readmeToManPage(pkg.readme, {
    name: pkg.name,
    version: pkg['dist-tags'].latest,
    description: pkg.description,
    date: pkg.time.modified,
    section: 'npm',
    manual: npmExpansion()
  });
}
