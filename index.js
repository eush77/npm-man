'use strict';

var registryUrl = require('registry-url')(),
    got = require('got'),
    npmExpansion = require('npm-expansion'),
    mdast = require('mdast'),
    mdastFile = require('mdast/lib/file'),
    mdastMan = require('mdast-man'),
    mdastStripBadges = require('mdast-strip-badges'),
    mdastSqueezeParagraphs = require('mdast-squeeze-paragraphs'),
    mdAstVisit = require('mdast-util-visit'),
    mdAstToString = require('mdast-util-to-string');


var manPage = function (pkg) {
  var ast = mdast()
        .use(mdastStripBadges)
        .use(mdastSqueezeParagraphs)
        .run(mdast.parse(pkg.readme));

  var description = pkg.description;

  // Replace the default description with the content of the first
  // paragraph of readme body since they are often identical.
  mdAstVisit(ast, 'paragraph', function (node, index, parent) {
    var firstParagraph = mdAstToString(node);
    var prefix = firstParagraph.slice(0, description.length);
    if (prefix.toLowerCase() == description.toLowerCase()) {
      description = firstParagraph;
      parent.children.splice(index, 1);
    }
    return false;
  });

  var manmd = mdast().use(mdastMan, {
    section: 'npm',
    manual: npmExpansion(),
    name: pkg.name,
    version: pkg.version,
    description: description,
    date: pkg.time.modified
  });

  // mdast-man captures some settings on the File object.
  var file = mdastFile();
  return manmd.stringify(manmd.run(ast, file), file, {});
};


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
    cb(err, opts.man ? manPage(pkg) : pkg.readme);
  });
};
