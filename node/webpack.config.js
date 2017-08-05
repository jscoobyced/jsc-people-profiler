//const jsConfig = require('./webpack.js.debug.config');
const jsConfig = require('./webpack.js.config');
const cssConfig = require('./webpack.css.config');

module.exports = [jsConfig.jsConfig, cssConfig.cssConfig];