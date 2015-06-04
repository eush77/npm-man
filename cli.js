#!/usr/bin/env node
'use strict';

var npmMan = require('./'),
    pager = require('default-pager'),
    help = require('help-version')(usage()).help;


function usage() {
  return 'Usage:  npm-man <package>';
}


(function (argv) {
  if (argv.length != 1) {
    help(argv.length);
  }
}(process.argv.slice(2)));


npmMan(process.argv[2], function (err, man) {
  if (err) return console.error(err);
  pager().end(man);
});
