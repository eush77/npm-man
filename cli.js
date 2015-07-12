#!/usr/bin/env node
'use strict';

var npmMan = require('./');

var help = require('help-version')(usage()).help,
    minimist = require('minimist'),
    manPager = require('man-pager'),
    defaultPager = require('default-pager');


function usage() {
  return [
    'Usage:  npm-man [--markdown | -m] <package>',
    '',
    'Fetch from npm and open package readme as a man page.',
    '',
    'Options:',
    '  --markdown, -m  Open readme in Markdown instead.'
  ].join('\n');
}


var opts = minimist(process.argv.slice(2), {
  boolean: 'markdown',
  alias: {
    markdown: 'm',
  },
  default: {
    markdown: false
  },
  unknown: function (arg) {
    if (arg[0] == '-') {
      return help(1);
    }
  }
});


(function (opts, argv) {
  if (argv.length != 1) {
    return help(argv.length);
  }

  var pager = opts.markdown ? defaultPager : manPager;

  npmMan(argv[0], { man: !opts.markdown }, function (err, man) {
    if (err) return console.error(err);
    pager().end(man);
  });
}(opts, opts._));
