#!/usr/bin/env node
'use strict';

var npmMan = require('./');

var help = require('help-version')(usage()).help,
    manPager = require('man-pager'),
    defaultPager = require('default-pager');


function usage() {
  return 'Usage:  npm-man <package>';
}


(function (argv) {
  if (argv.length != 1) {
    return help(argv.length);
  }

  npmMan(process.argv[2], function (err, man) {
    if (err) return console.error(err);
    manPager().end(man);
  });
}(process.argv.slice(2)));
