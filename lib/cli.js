/* global module, Promise, process, require */

var minimist = require('minimist');
var path = require('path');

var COMMAND_HELP = 'help';
var COMMAND_EXPORT = 'export';
var COMMAND_APP = 'app';
var COMMAND_PIPELINE = 'pipeline';
var DEFAULT_COMMAND = COMMAND_HELP;

function cli(heroin, cliArgs, envs, log, configReader) {
    "use strict";

    function parseArguments() {
        return minimist(cliArgs, { '--': true });
    }

    function getToken(argv) {
        return argv.token || argv.t || envs.HEROKU_API_TOKEN || null;
    }

    function getConfigArguments(argv) {
        return argv['--'] || [];
    }

    function getCommandArgument(argv) {
        return argv._[1] || null;
    }

    function discoverCommand(argv) {
        if (argv.help || argv.h) {
            return COMMAND_HELP;
        }
        return argv._[0] || DEFAULT_COMMAND;
    }

    function unknownToken() {
        log('Heroku API token not found');
        return Promise.reject(new Error('Heroku API token not found'));
    }

    function configPath(file) {
        return path.join(process.cwd(), file);
    }

    function readConfiguration(file) {
        return configReader(configPath(file));
    }

    function commandHelp() {
        log('Help');
        return Promise.resolve();
    }

    function commandApp(configFile, configArgv) {
        return configurator(readConfiguration(configFile, configArgv));
    }

    function commandPipeline(configFile, configArgv) {
        return configurator.pipeline(readConfiguration(configFile, configArgv));
    }

    function commandExport(appName) {
        return configurator.export(appName)
            .then(function (result) {
                log(result);
            });
    }

    function unknownCommand(command) {
        log('Command not found: ' + command);
        return Promise.reject(new Error('Command not found: ' + command));
    }

    var argv = parseArguments();

    var token = getToken(argv);
    var command = discoverCommand(argv);
    var argument = getCommandArgument(argv);
    var configArgv = getConfigArguments(argv);

    if (command === COMMAND_HELP) {
        return commandHelp();
    }

    // only command help does not require token
    if (!token) {
        return unknownToken();
    }

    var configurator = heroin(token);

    switch (command) {
        case COMMAND_APP:
            return commandApp(argument, configArgv);
        case COMMAND_PIPELINE:
            return commandPipeline(argument, configArgv);
        case COMMAND_EXPORT:
            return commandExport(argument);
        default:
            return unknownCommand();
    }
}

module.exports = cli;
