#!/usr/bin/env node
'use strict';

var npmMan = require('./');

var help = require('help-version')(usage()).help,
    minimist = require('minimist'),
    manPager = require('man-pager'),
    defaultPager = require('default-pager');


function usage() {
  return 'Usage:  npm-man [--no-man] <package>';
}


var opts = minimist(process.argv.slice(2), {
  boolean: 'man',
  default: {
    man: true
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

  var pager = opts.man ? manPager : defaultPager;

  npmMan(argv[0], opts, function (err, man) {
    if (err) return console.error(err);
    pager().end(man);
  });
}(opts, opts._));
