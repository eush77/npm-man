#!/usr/bin/env node
'use strict';

var npmMan = require('./');


npmMan(process.argv[2], function (err, man) {
  if (err) return console.error(err);
  process.stdout.write(man);
});
