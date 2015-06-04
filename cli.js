#!/usr/bin/env node
'use strict';

var npmMan = require('./'),
    pager = require('default-pager');


npmMan(process.argv[2], function (err, man) {
  if (err) return console.error(err);
  pager().end(man);
});
