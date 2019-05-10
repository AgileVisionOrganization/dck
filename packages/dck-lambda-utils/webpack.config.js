/* global __dirname, require, module*/

const buildConfig = require("../../webpack-shared.config");

module.exports = buildConfig("dck-lambda-utils", __dirname);
