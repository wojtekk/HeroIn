/* global describe, it, Promise, require */

var chai = require('chai');
var assert = chai.assert;
var log = require('./noop');

describe('Command line interface', function () {
    "use strict";

    describe('Command: app', function () {
        it('should read config from file', function (done) {

        });

        it('should configure application', function (done) {

        });

        it('should pass cli arguments to configuration', function (done) {

        });
    });

    describe('Command: export', function () {
        it('should export app configuration', function (done) {

        });

        it('should print result', function (done) {

        });
    });

    describe('Command: pipeline', function () {
        it('should read config from file', function (done) {

        });

        it('should configure pipeline', function (done) {

        });

        it('should pass cli arguments to configuration', function (done) {

        });
    });

    describe('Command: help', function () {
        it('should print help', function (done) {

        });
    });

    describe('Token', function () {
        it('should read token from environment variable', function (done) {

        });

        it('should read token from argument: token', function (done) {

        });

        it('should read token from argument: t', function (done) {

        });

        it('should return error when token does not exist', function (done) {

        });
    });
});
