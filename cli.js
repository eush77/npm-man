#!/usr/bin/env node
'use strict';

var npmMan = require('./');

var help = require('help-version')(usage()).help,
    manPager = require('man-pager');


function usage() {
  return [
    'Usage:  npm-man <package>',
    '',
    'Fetch from npm and open package readme as a man page.'
  ].join('\n');
}


(function (argv) {
  if (argv.length != 1) {
    return help(argv.length);
  }

  npmMan(argv[0], function (err, man) {
    if (err) return console.error(err);
    manPager().end(man);
  });
}(process.argv.slice(2)));
