/* global require, process, console */

var heroin = require('../lib/heroin.js');
var cli = require('../lib/cli.js');

cli(heroin, process.argv.slice(2), process.env, console.log, require)
    .catch(function (err) {
        "use strict";
        process.exit(1);
    });
